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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const resetForm = (action: FormikHelpers<PostType>) => {
    action.resetForm();
    setReset(!reset);
  };

  const handleSubmit = (
    value: any,
    action: FormikHelpers<PostType>,
    toast: any,
    _router: AppRouterInstance
  ) => {
    //With image file
    setIsSubmitting(true);
    console.log("1st", isSubmitting);
    if (value.file) {
      const formData = new FormData();
      formData.append("file", value.file);
      axios({
        url: process.env.NEXT_PUBLIC_API_URL + "upload",
        headers: { "content-type": "multipart/form-data" },
        method: "POST",
        data: formData,
      })
        .then((res) => {
          delete value["file"];
          postService.createPost({
            ...value,
            image_path: res.data.imagePath,
          });
        })
        .catch(() => {
          toast({
            title: "Post creation failed",
            variant: "subtle",
            status: "error",
            id: "post-creation-fail",
          });
        });
      setIsSubmitting(false);
      console.log("2nd", isSubmitting);
    } else {
      //Without image file
      delete value["file"];
      postService
        .createPost({
          ...value,
        })
        .then(() => {
          toast({
            title: "Post created",
            variant: "subtle",
            status: "success",
            id: "post-created",
          });
          resetForm(action);
        });
      setIsSubmitting(false);
    }
    return;
  };

  return (
    <BlogPostCreateEditForm
      title={"Write a blog post"}
      buttonLabel="Create Post"
      submitHandle={handleSubmit}
      reset={reset}
      isSubmitting={isSubmitting}
    />
  );
}
