"use client";
import { Text, Image } from "@chakra-ui/react";
import { postService } from "@/service";
import { PostResponseType } from "@/types/posts";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";

type PageProps = {
  params: { id: string };
};

export default function Page({ params }: PageProps) {
  const [post, setPost] = useState<PostResponseType>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    postService.getPostById(params.id).then((res) => {
      const data: PostResponseType = res?.data;
      setPost(data);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || post === undefined) {
    return <Loading />;
  }

  return (
    <Box px={{ base: "1em", lg: "2em" }} py={{ md: "1em", sm: "2" }}>
      <Text fontSize={"5xl"} color={"gray.500"} mb={"0"}>
        {post.title}
      </Text>
      <Text fontSize={"lg"} color={"gray.400"} mb={"5"}>
        {new Date(post.author.create_at).toLocaleDateString()} . Author{" "}
        <Text as={"span"} color="pink.400">
          {post.author.username}
        </Text>
      </Text>
      <Image
        objectFit="cover"
        w={{ md: "50em" }}
        maxH={{ md: "30em", sm: "20em" }}
        src={
          post.image_path
            ? `${process.env.NEXT_PUBLIC_API_ASSETS_URL}${post.image_path}`
            : "https://images.unsplash.com/photo-1515787366009-7cbdd2dc587b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        }
        fallbackSrc={
          "https://images.unsplash.com/photo-1515787366009-7cbdd2dc587b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        }
        alt={post.title}
      />
      <Text dangerouslySetInnerHTML={{ __html: post.post }} mt={"5"} />
    </Box>
  );
}
