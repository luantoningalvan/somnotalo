import { Heading } from "@chakra-ui/react";
import React from "react";
interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = (props) => {
  const { title } = props;

  return (
    <Heading fontSize="md" mb={4}>
      {title}
    </Heading>
  );
};

export default SectionTitle;
