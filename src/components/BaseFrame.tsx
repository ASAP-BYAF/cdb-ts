import Header from "components/header/Header";
import Footer from "components/footer/Footer";
import React from "react";
import GlobalSpinner from "components/spinner/GlobalSpinner";
import GlobalModal from "./modal/normal/GlobalModal";
import GlobalModalWithInput from "./modal/with-input/GlobalModalWithInput";
import GlobalSnackbar from "./snackbar/GlobalSnackbar";
import GlobalSpinnerContextProvider from "contexts/spinner/GlobalSpinnerContext";
import GlobalModalContextProvider from "contexts/modal/normal/GlobalModalContext";
import GlobalModalWithInputContextProvider from "contexts/modal/with-input/GlobalModalWithInputContext";
import GlobalSnackbarContextProvider from "contexts/snackbar/GlobalSnackbarContext";

const BaseFrame = (props: { children: React.ReactElement }): JSX.Element => {
  const { children } = props;
  return (
    <GlobalSnackbarContextProvider>
      <GlobalModalWithInputContextProvider>
        <GlobalModalContextProvider>
          <GlobalSpinnerContextProvider>
            <>
              <Header />
              <main
                className={`min-h-[80vh] pb-2 bg-repeat`}
                style={{ backgroundImage: `url(/block.png)` }}
              >
                {children}
              </main>
              <Footer />
              <GlobalSpinner />
              <GlobalSnackbar />
              <GlobalModal />
              <GlobalModalWithInput />
            </>
          </GlobalSpinnerContextProvider>
        </GlobalModalContextProvider>
      </GlobalModalWithInputContextProvider>
    </GlobalSnackbarContextProvider>
  );
};

export default BaseFrame;
