"use client";
import { useAppSelector } from "@/hooks/hooks";
import { Box } from "@chakra-ui/react";

export default function Home() {
  const user = useAppSelector((state) => state.user);
  return (
    <Box>
      blogs
      {user.username} -{user.email}
    </Box>
  );
}
