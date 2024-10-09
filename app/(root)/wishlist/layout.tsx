"use client";
import Container from "@/components/ui/Container";
interface WishlistLayoutProps {
  children: React.ReactNode;
}

const WishlistLayout: React.FC<WishlistLayoutProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default WishlistLayout;
