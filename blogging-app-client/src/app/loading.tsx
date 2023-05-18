"use client";
import { AbsoluteCenter, Box, Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Box position="relative" h="100vh">
      <AbsoluteCenter axis="both">
        <Spinner size={"xl"} color="pink.400" />
      </AbsoluteCenter>
    </Box>
  );
}
