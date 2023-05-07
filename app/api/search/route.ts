import { supabaseClient } from "@/supabase/supabaseClient";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "azure-openai";

const configuration = new Configuration({
  azure: {
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    endpoint: process.env.NEXT_PUBLIC_OPENAI_ENDPOINT,
    deploymentName: process.env.NEXT_PUBLIC_OPENAI_DEPLOYMENT_NAME,
  },
});
const openAi = new OpenAIApi(configuration);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({
      status: "error",
      message: "Missing query parameter",
    });
  }

  // create embedding
  const embeddingResponse = await openAi.createEmbedding({
    model: process.env.NEXT_PUBLIC_OPENAI_DEPLOYMENT_NAME!,
    input: query,
  });

  const [{ embedding }] = embeddingResponse.data.data;

  // search for similar embeddings in supabase
  const { data, error } = await supabaseClient.rpc("search_developers", {
    query_embedding: embedding,
    similarity_threshold: 0.75,
    match_count: 5,
  });

  if (data) {
    return NextResponse.json(data);
  }

  return NextResponse.json({
    status: "error",
    message: error?.message || "Something went wrong",
  });
}
