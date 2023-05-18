"use client";
import React, { useState } from "react";
import {
  Text,
  Stack,
  useToast,
  Box,
  FormLabel,
  FormControl,
  Image,
} from "@chakra-ui/react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";
import { PostType } from "@/types/posts";

import {
  TextEditor,
  FileUpload,
  PrimaryButton,
  TextField,
} from "@/app/components";

type PagePropsType = {
  title: string;
  submitHandle: (
    value: any,
    action: FormikHelpers<PostType>,
    toast: any,
    router: AppRouterInstance
  ) => void;
  reset: boolean;
  buttonLabel: string;
  initialProps?: PostType;
  imageUrl?: string;
};

const initialValue: PostType = {
  title: "",
  description: "",
  post: "",
  file: null,
};

const schema = Yup.object().shape({
  title: Yup.string().min(6).required(),
  description: Yup.string().min(6).required(),
  post: Yup.string().required().min(5),
});

const FALLBACK_SRC =
  "https://www.independentmediators.co.uk/wp-content/uploads/2016/02/placeholder-image.jpg";

const BlogPostCreateEditForm = ({
  title,
  submitHandle,
  buttonLabel,
  reset,
  initialProps,
  imageUrl,
}: PagePropsType) => {
  const router = useRouter();
  const toast = useToast();
  return (
    <>
      <Stack spacing={5}>
        <Text fontSize={"3xl"}>{title}</Text>
        <Formik
          initialValues={initialProps ? initialProps : initialValue}
          validateOnMount={false}
          validateOnChange={false}
          validationSchema={schema}
          onSubmit={(value, action) => {
            submitHandle(value, action, toast, router);
          }}
        >
          {({ setFieldValue, values, handleSubmit }) => (
            <Form>
              <Box
                justifyContent={"start"}
                alignItems={"start"}
                gap={5}
                display={"flex"}
                flexDirection={{ base: "column", md: "row" }}
                flex={1}
                w="100%"
              >
                <Stack spacing={4} w={{ base: "20em", md: "30em" }}>
                  <TextField
                    name="title"
                    label="Title"
                    type="text"
                    size="md"
                    w={{ base: "100%" }}
                    variant="outline"
                    isRequired={true}
                    id="title"
                  />
                  <TextField
                    name="description"
                    label="Description"
                    type="text"
                    size="md"
                    w={{ base: "100%" }}
                    variant="outline"
                    isRequired={true}
                    id="description"
                  />
                  <FileUpload
                    isRequired={false}
                    id={"file"}
                    name={"file"}
                    label={"Image"}
                    setFieldValue={setFieldValue}
                  />
                  <Image
                    src={
                      values.file
                        ? URL.createObjectURL(values.file)
                        : imageUrl
                        ? `${process.env.NEXT_PUBLIC_API_ASSETS_URL}${imageUrl}`
                        : FALLBACK_SRC
                    }
                    boxSize={"xs"}
                    alt="image"
                  />
                </Stack>
                <Box w={{ base: "100%" }}>
                  <Field name={"blog"}>
                    {() => (
                      <FormControl id={"blog"} isRequired={true}>
                        <FormLabel>Post</FormLabel>
                        <TextEditor
                          setFiledValue={setFieldValue}
                          reset={reset}
                          filedName={"post"}
                          post={initialProps?.post ? initialProps?.post : ""}
                        />
                      </FormControl>
                    )}
                  </Field>
                </Box>
              </Box>
              <Box display={"flex"} justifyContent={"flex-end"} pt={4}>
                <PrimaryButton label={buttonLabel} type="submit" />
              </Box>
            </Form>
          )}
        </Formik>
      </Stack>
    </>
  );
};

export default BlogPostCreateEditForm;
