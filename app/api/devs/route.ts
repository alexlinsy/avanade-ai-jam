import { supabaseClient } from "@/supabase/supabaseClient";
import { NextResponse } from "next/server";
import { DeveloperType } from "../../../developers";
import { Configuration, OpenAIApi } from "azure-openai";
import { v4 as uuidv4 } from "uuid";

const configuration = new Configuration({
  azure: {
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    endpoint: process.env.NEXT_PUBLIC_OPENAI_ENDPOINT,
    deploymentName: process.env.NEXT_PUBLIC_OPENAI_DEPLOYMENT_NAME,
  },
});

const openAi = new OpenAIApi(configuration);

export async function POST(request: Request) {
  const developer = (await request.json()) as DeveloperType;
  const { experiences } = developer;

  // Create Embedding
  experiences.forEach(async (experience) => {
    const { company, content } = experience;
    const flattenExperience = `${company} - ${content}`;
    const flattenDeveloper = {
      ...developer,
      id: uuidv4(),
      experiences: flattenExperience,
    };
    const embeddingResponse = await openAi.createEmbedding({
      model: process.env.NEXT_PUBLIC_OPENAI_DEPLOYMENT_NAME!,
      input: `${company} - ${content}`,
    });

    const [{ embedding }] = embeddingResponse.data.data;

    // Insert into Supabase
    const { error } = await supabaseClient.from("developers").insert({
      ...flattenDeveloper,
      embedding,
    });

    if (error) console.log("DB insert error", error);
  });

  return NextResponse.json({ status: "ok" });
}
