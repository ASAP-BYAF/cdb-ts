import ManagedForm from "./ManagedForm";
import GlobalSpinnerContextProvider from "contexts/spinner/GlobalSpinnerContext";
import GlobalModalContextProvider from "contexts/modal/normal/GlobalModalContext";
import GlobalModalWithInputContextProvider from "contexts/modal/with-input/GlobalModalWithInputContext";
import GlobalSnackbarContextProvider from "contexts/snackbar/GlobalSnackbarContext";

const Register = (): JSX.Element => {
  return (
    <GlobalSnackbarContextProvider>
      <GlobalModalWithInputContextProvider>
        <GlobalModalContextProvider>
          <GlobalSpinnerContextProvider>
            <ManagedForm />
          </GlobalSpinnerContextProvider>
        </GlobalModalContextProvider>
      </GlobalModalWithInputContextProvider>
    </GlobalSnackbarContextProvider>
  );
};

export default Register;
