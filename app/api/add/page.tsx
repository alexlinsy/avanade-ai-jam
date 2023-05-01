"use client";

import { DeveloperType, developers_data } from "@/developers";
import { useState } from "react";

const AddDataPage = () => {
  // Add developers data to db by calling post api
  const [searchResults, setSearchResults] = useState("");

  const addHandler = async (developer: DeveloperType) => {
    const res = await fetch("/api/devs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(developer),
    });
    if (res.ok) {
      console.log("Developer added successfully to supabase");
    } else {
      console.log("Error adding developer to supabase", res.status);
    }
  };

  const addData = async () => {
    for (const developer of developers_data) {
      await addHandler(developer);
    }
  };

  const handleSubmit = async (e: any) => {
    if (e.key === "Enter") {
      const res = await fetch(`/api/search?query=${searchResults}`);
      if (!res.ok) {
        console.log("Error fetching search results", res.status);
      }
      const data = await res.json();
      console.log("Match results from GPT embedding", data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-around w-full h-screen">
      <button
        className="px-4 py-3 rounded-md bg-neutral-900 text-neutral-50"
        onClick={addData}
      >
        Add Data
      </button>
      <div>
        <input
          className="rounded-md w-[200px] h-10 bg-white pl-4"
          placeholder="Type in for search result"
          onChange={(e) => setSearchResults(e.target.value)}
          onKeyDown={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AddDataPage;
