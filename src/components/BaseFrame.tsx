import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import React from "react";
import GlobalSpinner from "components/spinner/GlobalSpinner";
import GlobalModal from "./modal/normal/GlobalModal";

const BaseFrame = (props: { children: React.ReactElement }): JSX.Element => {
  const { children } = props;
  return (
    <div>
      <GlobalSpinner />
      <Header />
      <main className="min-h-[80vh] pb-10 bg-slate-100">{children}</main>
      <Footer />
      <GlobalModal />
    </div>
  );
};

export default BaseFrame;
