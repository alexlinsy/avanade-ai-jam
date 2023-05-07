import { useState } from "react";
import Image from "next/image";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  SkeletonCircle,
  SkeletonText,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { searchHeaderText } from "@/utilities/constants";
import useSWR from "swr";
import { CandidateType } from "@/developers";
import CandidateCard from "./CandidateCard";
import logo from "../public/ai-jam-logo.png";

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [enterKeyPressed, setEnterKeyPressed] = useState(false);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    enterKeyPressed ? `/api/search?query=${searchQuery}` : null,
    fetcher
  );

  const handleSubmit = (e: any) => {
    if (e.key === "Enter") {
      setEnterKeyPressed(true);
    } else {
      setEnterKeyPressed(false);
    }
  };

  let candidates: CandidateType[] = [];

  if (data && !error) {
    console.log("data", data);
    candidates = data.reduce((acc: CandidateType[], current: CandidateType) => {
      const candidate = acc.find(
        (item: CandidateType) => item.name === current.name
      );
      if (!candidate) {
        return [...acc, current];
      } else {
        return acc;
      }
    }, []);
  }

  return (
    <div className="w-full flex flex-col items-center mt-[100px] h-full">
      <div className="flex">
        <h1 className="mr-4 text-4xl font-bold text-center text-neutral-900">
          {searchHeaderText}
        </h1>
        <Image src={logo} alt="AI Jam" className="w-[60px] h-[60px]" />
      </div>
      <InputGroup className="max-w-2xl mt-10" onKeyDown={handleSubmit}>
        <InputLeftElement
          pointerEvents="none"
          className="mt-1"
          // eslint-disable-next-line react/no-children-prop
          children={<SearchIcon color="black.300" />}
        />
        <Input
          className="border-black border-2"
          focusBorderColor="blackAlpha.500"
          placeholder="Enter tech requirements of your project"
          size="lg"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>
      {error && (
        <Alert status="error">
          <AlertIcon />
          There was an error processing your request
        </Alert>
      )}
      {isLoading && (
        <Box padding="6" boxShadow="lg" bg="white" width="2xl" marginTop="10">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        </Box>
      )}
      {data &&
        !error &&
        candidates.length > 0 &&
        candidates.map((item: CandidateType, index: number) => (
          <div key={index}>
            <CandidateCard candidate={item} />
          </div>
        ))}
    </div>
  );
};

export default SearchSection;
