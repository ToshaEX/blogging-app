import { Button } from "@chakra-ui/react";
import React from "react";

type ButtonPropsType = {
  handleClick: () => void;
  label: string;
};

const SecondaryButton = ({ handleClick, label }: ButtonPropsType) => {
  return (
    <Button
      as={"button"}
      fontSize={"sm"}
      fontWeight={400}
      variant={"link"}
      onClick={handleClick}
    >
      {label}
    </Button>
  );
};

export default SecondaryButton;
