import Header from "./Header";
import Footer from "./Footer";
import React from "react";

const BaseFrame = (props: { children: React.ReactElement }) => {
  const { children } = props;
  return (
    <div>
      <Header />
      <main className="min-h-[80vh]">{children}</main>
      <Footer />
    </div>
  );
};

export default BaseFrame;
