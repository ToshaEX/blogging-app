import React from "react";
import { Field } from "formik";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

type TextFieldPropType = {
  isRequired: boolean;
  id: string;
  type: string;
  name: string;
  label: string;
  w?: any;
  size?: "lg" | "sm" | "xs" | "md";
  variant?: "outline" | "filled" | "flushed" | "unstyled";
};

type FromProps = {
  form: any;
  field: any;
};

const TextField = ({
  isRequired,
  id,
  name,
  type,
  label,
  size = "lg",
  variant = "outline",
  w = "auto",
}: TextFieldPropType) => {
  return (
    <Field name={name}>
      {({ field }: FromProps) => (
        <FormControl id={id} isRequired={isRequired}>
          <FormLabel>{label}</FormLabel>
          <Input {...field} variant={variant} type={type} size={size} w={w} />
        </FormControl>
      )}
    </Field>
  );
};

export default TextField;
