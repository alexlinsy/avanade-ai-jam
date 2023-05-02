import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { searchHeaderText } from "@/utilities/constants";

const SearchSection = () => {
  return (
    <div className="w-full flex flex-col items-center mt-[100px]">
      <h1 className="text-4xl font-bold text-center text-neutral-900">
        {searchHeaderText}
      </h1>
      <InputGroup className="max-w-2xl mt-10">
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
        />
      </InputGroup>
    </div>
  );
};

export default SearchSection;
