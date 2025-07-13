import React from "react";

interface ContentProps {
  children?: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => (
  <main className="bg-white p-4 col-span-12 md:col-span-10">{children}</main>
);

export { Content };
