import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import React from "react";
import GlobalSpinner from "components/spinner/GlobalSpinner";
import GlobalModal from "./modal/normal/GlobalModal";
import GlobalModalWithInput from "./modal/with-input/GlobalModalWithInput";
import GlobalSnackbar from "./snackbar/GlobalSnackbar";

const BaseFrame = (props: { children: React.ReactElement }): JSX.Element => {
  const { children } = props;
  return (
    <div>
      <GlobalSpinner />
      <GlobalSnackbar />
      <Header />
      <main
        className={`min-h-[80vh] pb-2 bg-repeat`}
        style={{ backgroundImage: `url(/block.png)` }}
      >
        {children}
      </main>
      <Footer />
      <GlobalModal />
      <GlobalModalWithInput />
    </div>
  );
};

export default BaseFrame;
