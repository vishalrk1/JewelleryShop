import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen items-center bg-background pt-14 md:justify-center md:pt-0">
      {children}
    </div>
  );
};

export default AuthLayout;
