import React from "react";
import { Heading } from "@chakra-ui/react";
import styled from "styled-components";

interface PageContentProps {
  title?: string;
  rightContent?: React.ReactElement;
}

const PageHeader = styled.div`
  margin-bottom: 24px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const PageContent: React.FC<PageContentProps> = (props) => {
  const { title, rightContent, children } = props;

  return (
    <div style={{ padding: "24px 32px 32px" }}>
      {title && (
        <PageHeader>
          <Heading lineHeight={1} as="h2" size="lg">
            {title}
          </Heading>
          {!!rightContent && rightContent}
        </PageHeader>
      )}
      {children}
    </div>
  );
};

export default PageContent;
