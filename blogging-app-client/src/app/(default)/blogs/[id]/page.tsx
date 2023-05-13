"use client";
import { Box } from "@chakra-ui/react";

type PageProps = {
  params: { id: string };
};

export default function BlogPost({ params }: PageProps) {
  return <Box>{params.id}</Box>;
}
