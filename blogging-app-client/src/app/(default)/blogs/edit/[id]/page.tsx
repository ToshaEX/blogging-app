"use client";
import Loading from "@/app/loading";
import { postService } from "@/service";
import { PostResponseType, PostType } from "@/types/posts";
import { FormikHelpers } from "formik";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

type pageType = {
  params: {
    id: string;
  };
};
const BlogPostCreateEditForm = dynamic(
  () => import("@/app/components/BlogPostCreateEditForm")
);

export default function EditBlogPost({ params }: pageType) {
  const [post, setPost] = useState<PostResponseType>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    postService.getPostById(params.id).then((res) => {
      setPost(res?.data);
      setLoading(false);
    });
  }, []);

  if (loading || post === undefined) return <Loading />;

  const submitHandle = (
    value: any,
    action: FormikHelpers<PostType>,
    toast: any,
    router: AppRouterInstance
  ) => {
    
    if (value.file) {
      //TODO  remove past image
      //TODO Handle update image
      // handle post text update
      
    } 
      delete value["file"];
      postService
        .updatePost(post?._id, {
          ...value,
        })
        .then(() =>
          toast({
            title: "Post update Successfully",
            variant: "subtle",
            status: "success",
            id: "update-done",
          })
        )
        .catch((err) => {
          toast({
            title: err.response.data,
            variant: "subtle",
            status: "error",
            id: "update-fail",
          });
        });
    
  };

  return (
    <BlogPostCreateEditForm
      title={"Update Blog post"}
      submitHandle={submitHandle}
      reset={false}
      buttonLabel={"Update Post"}
      initialProps={{
        description: post?.description,
        file: null,
        post: post?.post,
        title: post?.title,
      }}
      imageUrl={post.image_path}
    />
  );
}
