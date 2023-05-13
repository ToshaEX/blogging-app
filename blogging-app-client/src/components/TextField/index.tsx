import React from "react";
import { Field } from "formik";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

type TextFieldPropType = {
  isRequired: boolean;
  id: string;
  type: string;
  name: string;
  label: string;
  size?: "lg" | "sm" | "xs" | "md";
  variant?: "outline" | "filled" | "flushed" | "unstyled";
};

const TextField = ({
  isRequired,
  id,
  name,
  type,
  label,
  size = "lg",
  variant = "outline",
}: TextFieldPropType) => {
  return (
    <Field name={name}>
      {({ field, form }) => (
        <FormControl id={id} isRequired={isRequired}>
          <FormLabel>{label}</FormLabel>
          <Input {...field} variant={variant} type={type} size={size} />
        </FormControl>
      )}
    </Field>
  );
};

export default TextField;
