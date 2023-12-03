// import RefineRadioBase from "app/register/RefineRadioBase";
import ManagedForm from "./ManagedForm";
import GlobalSpinnerContextProvider from "contexts/spinner/GlobalSpinnerContext";
import GlobalModalContextProvider from "contexts/modal/normal/GlobalModalContext";
import GlobalModalWithInputContextProvider from "contexts/modal/with-input/GlobalModalWithInputContext";

const Search = () => {
  return (
    <GlobalModalWithInputContextProvider>
      <GlobalModalContextProvider>
        <GlobalSpinnerContextProvider>
          {/* <RefineRadioBase /> */}
          <ManagedForm />
        </GlobalSpinnerContextProvider>
      </GlobalModalContextProvider>
    </GlobalModalWithInputContextProvider>
  );
};

export default Search;
