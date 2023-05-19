import { Button } from "@chakra-ui/react";
import React from "react";

type ButtonPropsType = {
  label: string;
  display?: any;
};

const SubmitButton = ({ label, display = "inline-flex" }: ButtonPropsType) => {
  return (
    <Button
      as={"button"}
      display={display}
      fontSize={"sm"}
      fontWeight={600}
      color={"white"}
      bg={"pink.400"}
      _hover={{
        bg: "pink.300",
      }}
      type={"submit"}
    >
      {label}
    </Button>
  );
};

export default SubmitButton;
