"use client";
import routes from "@/app/constant/routes";
import Loading from "@/app/loading";
import { postService } from "@/service";
import { PostResponseType } from "@/types/posts";
import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const BlogPostCard = dynamic(() => import("@/app/components/BlogPostCard"));
const NotFound = dynamic(() => import("@/app/components/NotFound"));

const FALLBACK_SRC =
  "https://images.unsplash.com/photo-1515787366009-7cbdd2dc587b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80";

export default function Page() {
  const [posts, setPosts] = useState<PostResponseType[]>([]);
  const router = useRouter();
  useEffect(() => {
    postService.getUserPosts().then((res) => {
      const data: PostResponseType[] = res?.data;
      setPosts(data);
    });
  }, []);

  const handleClick = (id: string) => {
    router.push(routes.editBlogPosts + `/${id}`);
  };

  return (
    <Suspense fallback={<Loading />}>
      <Box
        px={{ base: "4em", md: "2em", sm: "1em" }}
        py={{ base: "2em", md: "1em", sm: ".5em" }}
      >
        {posts.length === 0 ? (
          <NotFound label="Posts" />
        ) : (
          posts.map((post) => (
            <BlogPostCard
              description={post.description}
              imageUrl={
                post.image_path
                  ? `${process.env.NEXT_PUBLIC_API_ASSETS_URL}${post.image_path}`
                  : FALLBACK_SRC
              }
              title={post.title}
              key={post._id + post.title + post.image_path}
              id={post._id}
              author={post.author.username}
              create_at={new Date(post.author.create_at)}
              buttonLabel="Edit Article"
              handleClick={() => {
                handleClick(post._id);
              }}
            />
          ))
        )}
      </Box>
    </Suspense>
  );
}
