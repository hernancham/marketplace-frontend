import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-500 w-full">
      {/* <Header> */}
      {children}
      {/* </Footer> */}
    </div>
  );
};
