import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import React from "react";
import GlobalSpinner from "components/spinner/GlobalSpinner";

const BaseFrame = (props: { children: React.ReactElement }): JSX.Element => {
  const { children } = props;
  return (
    <div>
      <GlobalSpinner />
      <Header />
      <main className="min-h-[80vh] pb-10 bg-slate-100">{children}</main>
      <Footer />
    </div>
  );
};

export default BaseFrame;
