"use client";
import { v4 as uuidv4 } from "uuid";
import CandidateCard from "@/components/CandidateCard";
import SearchSection from "@/components/SearchSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-screen items-center">
      <SearchSection />
    </div>
  );
}
