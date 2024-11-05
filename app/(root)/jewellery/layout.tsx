import Container from "@/components/ui/Container";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const IndividualProductLayout: React.FC<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default IndividualProductLayout;
