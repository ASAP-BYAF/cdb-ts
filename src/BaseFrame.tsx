import Header from "./header/Header";
import Footer from "./Footer";
import React from "react";

const BaseFrame = (props: { children: React.ReactElement }) => {
  const { children } = props;
  return (
    <div>
      <Header />
      <main className="min-h-[80vh] pb-10 bg-slate-100">{children}</main>
      <Footer />
    </div>
  );
};

export default BaseFrame;
