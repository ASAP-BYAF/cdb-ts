import ManagedForm from "./ManagedForm";
import GlobalSpinnerContextProvider from "contexts/spinner/GlobalSpinnerContext";
import GlobalModalContextProvider from "contexts/modal/normal/GlobalModalContext";
import GlobalModalWithInputContextProvider from "contexts/modal/with-input/GlobalModalWithInputContext";

const Register = (): JSX.Element => {
  return (
    <GlobalModalWithInputContextProvider>
      <GlobalModalContextProvider>
        <GlobalSpinnerContextProvider>
          <ManagedForm />
        </GlobalSpinnerContextProvider>
      </GlobalModalContextProvider>
    </GlobalModalWithInputContextProvider>
  );
};

export default Register;
