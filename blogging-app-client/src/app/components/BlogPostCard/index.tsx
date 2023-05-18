import {
  Card,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Text,
  Image,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React from "react";

const PrimaryButton = dynamic(() => import("@/app/components/PrimaryButton"));

type BlogPostCardPropsType = {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  buttonLabel: string;
  author: string;
  create_at: Date;
  handleClick: () => void;
};
const BlogPostCard = ({
  id,
  imageUrl,
  title,
  description,
  buttonLabel,
  author,
  create_at,
  handleClick,
}: BlogPostCardPropsType) => {
  return (
    <Card
      key={id + title}
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      my={"1em"}
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src={imageUrl}
        alt="Caffe Latte"
      />

      <Stack>
        <CardBody>
          <Heading size="md">{title}</Heading>

          <Text py="2" color={"gray.500"}>
            {create_at.toLocaleDateString()} . Author{" "}
            <Text as={"span"} color="pink.400">
              {author}
            </Text>
          </Text>
          <Text py="2">{description}</Text>
        </CardBody>

        <CardFooter>
          <PrimaryButton
            label={buttonLabel}
            type="button"
            handleClick={handleClick}
          />
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default BlogPostCard;
