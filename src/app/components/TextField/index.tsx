import React from "react";
import { Field } from "formik";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";

type TextFieldPropType = {
  isRequired: boolean;
  id: string;
  type: string;
  name: string;
  label: string;
  w?: any;
  size?: "lg" | "sm" | "xs" | "md";
  variant?: "outline" | "filled" | "flushed" | "unstyled";
  error: boolean | string | undefined;
  errorMessage: string | undefined;
  helperText?: string;
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
  error = false,
  errorMessage,
  helperText = "",
}: TextFieldPropType) => {
  return (
    <Field name={name}>
      {({ field }: FromProps) => (
        <FormControl id={id} isRequired={isRequired} isInvalid={!!error}>
          <FormLabel>{label}</FormLabel>
          <Input {...field} variant={variant} type={type} size={size} w={w} />
          {!error ? (
            <FormHelperText>{helperText}</FormHelperText>
          ) : (
            <FormErrorMessage>{errorMessage}</FormErrorMessage>
          )}
        </FormControl>
      )}
    </Field>
  );
};

export default TextField;
