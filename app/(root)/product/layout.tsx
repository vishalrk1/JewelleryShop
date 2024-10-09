"use client";
import Container from "@/components/ui/Container";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const ProductsPageLayout: React.FC<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default ProductsPageLayout;
