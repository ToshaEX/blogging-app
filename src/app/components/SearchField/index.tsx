import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import { SearchIcon } from "@chakra-ui/icons";

type SearchFieldProps = {
  setSearchString: Dispatch<SetStateAction<string>>;
};

const SearchField = ({ setSearchString }: SearchFieldProps) => {
  const [localSearchString, setLocalSearchString] = useState<string>("");
  return (
    <Box
      display={"flex"}
      flexDir={{ base: "column", md: "row" }}
      alignItems={"center"}
      gap="5"
      px={2}
      pb={{ base: "0", md: "5" }}
    >
      <InputGroup>
        <InputLeftElement pointerEvents={"none"}>
          <SearchIcon />
        </InputLeftElement>
        <Input
          size={"lg"}
          placeholder={"Search blog post..."}
          onChange={(e) => setLocalSearchString(e.target.value)}
          value={localSearchString}
        />
      </InputGroup>

      <PrimaryButton
        label="Search"
        display={"button"}
        type="button"
        handleClick={() => {
          setSearchString(localSearchString);
        }}
      />
    </Box>
  );
};

export default SearchField;
