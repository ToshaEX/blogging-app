import { Button } from "@chakra-ui/react";
import React from "react";

type ButtonPropsType = {
  handleClick?: () => void;
  label: string;
  display?: any;
  type?: "button" | "submit";
  isLoading?: boolean;
};

const PrimaryButton = ({
  handleClick = () => {},
  label,
  display = "inline-flex",
  type = "button",
  isLoading = false,
}: ButtonPropsType) => {
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
      type={type}
      onClick={handleClick}
      isLoading={isLoading}
    >
      {label}
    </Button>
  );
};

export default PrimaryButton;
