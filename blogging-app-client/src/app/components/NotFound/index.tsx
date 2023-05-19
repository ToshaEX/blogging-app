import { Box, Text, Image } from "@chakra-ui/react";
import React from "react";

type pageProp = {
  label: string;
};
const IMAGE_URL =
  "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg?w=740&t=st=1684462339~exp=1684462939~hmac=d96f7daf9fe93d75c75bfe87e0f72e79cda5ed7d2d936b129b15341df33a8892";
const NotFound = ({ label }: pageProp) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      position="relative"
      h="100%"
      flexDir={"column"}
    >
      <Text color={"gray.600"} fontSize={"xl"}>
        {label} Not found
      </Text>
      <Image boxSize={"sm"} src={IMAGE_URL} alt="Not found" />
    </Box>
  );
};

export default NotFound;
