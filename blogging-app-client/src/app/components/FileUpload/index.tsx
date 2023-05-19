import React from "react";
import { Field } from "formik";
import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";

type FileUploadPropType = {
  isRequired: boolean;
  id: string;
  name: string;
  label: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  w?: any;
  size?: "lg" | "sm" | "xs" | "md";
  variant?: "outline" | "filled" | "flushed" | "unstyled";
  accept?: string;
};

type FromProps = {
  form: any;
  field: any;
};

const FileUpload = ({
  isRequired,
  id,
  name,
  label,
  size = "lg",
  setFieldValue,
  w = "auto",
  accept = "image/png, image/jpeg",
}: FileUploadPropType) => {
  return (
    <Field name={name}>
      {({ field, form }: FromProps) => (
        <FormControl id={id} isRequired={isRequired} textAlign={"center"}>
          <FormLabel>{label}</FormLabel>
          <Text
            as="label"
            textAlign={"center"}
            display={"inline-flex"}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"pink.400"}
            px={"5"}
            py={"2"}
            borderRadius={"5"}
            _hover={{
              bg: "pink.300",
            }}
          >
            {"Upload Image"}
            <Input
              {...field}
              hidden
              variant="unstyled"
              type="file"
              accept={accept}
              size={size}
              onChange={(e) => {
                if (!e.target.files) return;
                const file = e.target.files[0];
                setFieldValue("file", file);
                console.log(e.target.files);
              }}
              value={undefined}
              w={w}
            />
          </Text>
        </FormControl>
      )}
    </Field>
  );
};

export default FileUpload;
