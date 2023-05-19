"use client";
import Loading from "@/app/loading";
import { fileService, postService } from "@/service";
import { PostResponseType, PostType } from "@/types/posts";
import axios from "axios";
import { FormikHelpers } from "formik";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const NotFound = dynamic(() => import("@/app/components/NotFound"));
const BlogPostCreateEditForm = dynamic(
  () => import("@/app/components/BlogPostCreateEditForm")
);

type pageType = {
  params: {
    id: string;
  };
};

export default function EditBlogPost({ params }: pageType) {
  const [post, setPost] = useState<PostResponseType>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    postService.getPostById(params.id).then((res) => {
      setPost(res?.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;
  if (post === undefined || typeof post === "string")
    return <NotFound label="Post" />;
  console.log(typeof post);
  const uploadFile = async (value: any) => {
    const formData = new FormData();
    formData.append("file", value.file);
    const { data } = await axios({
      url: process.env.NEXT_PUBLIC_API_URL + "upload",
      headers: { "content-type": "multipart/form-data" },
      method: "POST",
      data: formData,
    });
    return data;
  };

  const removePreviousFile = async () => {
    return await fileService.deleteImage(post.image_path);
  };

  const submitHandleWithNewImage = async (
    value: any,
    toast: any,
    router: AppRouterInstance
  ) => {
    // upload new file image
    const { imagePath }: any = await uploadFile(value);
    // handle post text update
    delete value["file"];
    const update = postService.updatePost(post?._id, {
      ...value,
      image_path: imagePath,
    });
    const remove = await removePreviousFile();
    Promise.all([update, remove]).then(() => {
      toast({
        title: "Post update Successfully",
        variant: "subtle",
        status: "success",
        id: "update-done",
      });
      router.refresh();
    });
  };

  const deleteHandle = async (toast: any, router: AppRouterInstance) => {
    const removeImage = removePreviousFile();
    const removePost = postService.deletePost(post._id);

    return await Promise.all([removeImage, removePost])
      .then(() => {
        toast({
          title: "Post successfully deleted",
          variant: "subtle",
          status: "success",
          id: "delete-done",
        });
        router.back();
      })
      .catch(() =>
        toast({
          title: "Post successfully deleted",
          variant: "subtle",
          status: "success",
          id: "delete-fail",
        })
      );
  };

  const submitHandle = async (
    value: any,
    _action: FormikHelpers<PostType>,
    toast: any,
    router: AppRouterInstance
  ) => {
    try {
      if (value.file) {
        submitHandleWithNewImage(value, toast, router);
      } else {
        delete value["file"];
        await postService
          .updatePost(post?._id, {
            ...value,
          })
          .then(() => {
            toast({
              title: "Post update Successfully",
              variant: "subtle",
              status: "success",
              id: "update-done",
            });
            window.location.reload();
          });
      }
    } catch {
      toast({
        title: "Post update failed",
        variant: "subtle",
        status: "error",
        id: "update-fail",
      });
    }
  };

  return (
    <BlogPostCreateEditForm
      title={"Update Blog post"}
      submitHandle={submitHandle}
      reset={false}
      buttonLabel={"Update Post"}
      deleteLabel="Delete"
      deleteHandle={async (toast, router) => deleteHandle(toast, router)}
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
