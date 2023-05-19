"use client";
import React, { useState } from "react";
import { postService } from "@/service";
import { PostType } from "@/types/posts";
import axios from "axios";
import { FormikHelpers } from "formik/dist/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import dynamic from "next/dynamic";

const BlogPostCreateEditForm = dynamic(
  () => import("@/app/components/BlogPostCreateEditForm")
);

export default function Page() {
  const [reset, setReset] = useState<boolean>(true);
  const resetForm = (action: FormikHelpers<PostType>) => {
    action.resetForm();
    setReset(!reset);
  };

  const handleSubmit = async (
    value: any,
    action: FormikHelpers<PostType>,
    toast: any,
    _router: AppRouterInstance
  ) => {
    console.log(value.file);
    if (value.file) {
      const formData = new FormData();
      formData.append("file", value.file);

      const { data, status } = await axios({
        url: process.env.NEXT_PUBLIC_API_URL + "upload",
        headers: { "content-type": "multipart/form-data" },
        method: "POST",
        data: formData,
      });
      if (status !== 201 && !toast.isActive("upload-fail")) {
        toast({
          title: "Image upload failed",
          variant: "subtle",
          status: "error",
          id: "upload-fail",
        });
        return;
      }
      delete value["file"];
      await postService.createPost({
        ...value,
        image_path: data.imagePath,
      });
    } else {
      delete value["file"];
      await postService.createPost({
        ...value,
      });
    }

    toast({
      title: "Post created",
      variant: "subtle",
      status: "success",
      id: "post-created",
    });
    resetForm(action);
    return;
  };

  return (
    <BlogPostCreateEditForm
      title={"Write a blog post"}
      buttonLabel="Create Post"
      submitHandle={handleSubmit}
      reset={reset}
    />
  );
}
