"use client";
import { Navbar } from "@/components";
import { Box } from "@chakra-ui/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Box mx={{ base: "1em", md: "4em", lg: "8em" }} my={{ base: ".5em" }}>
        {children}
      </Box>
    </>
  );
}
