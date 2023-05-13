import React, { ReactNode } from "react";
import {
  Flex,
  Stack,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

type AuthTemplatePropsType = {
  title: String;
  body: ReactNode;
  form: ReactNode;
};

const AuthTemplate = ({ title, body, form }: AuthTemplatePropsType) => {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>{title}</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            {body}
          </Text>
        </Stack>
        {form}
      </Stack>
    </Flex>
  );
};

export default AuthTemplate;
