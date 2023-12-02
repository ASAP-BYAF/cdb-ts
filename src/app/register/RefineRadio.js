import RefineRadioBase from "app/register/RefineRadioBase";
import GlobalSpinnerContextProvider from "components/spinner/GlobalSpinnerContext";
import GlobalModalContextProvider from "components/modal/normal/GlobalModalContext";
import GlobalModalWithInputContextProvider from "components/modal/with-input/GlobalModalWithInputContext";

const Search = () => {
  return (
    <GlobalModalWithInputContextProvider>
      <GlobalModalContextProvider>
        <GlobalSpinnerContextProvider>
          <RefineRadioBase />
        </GlobalSpinnerContextProvider>
      </GlobalModalContextProvider>
    </GlobalModalWithInputContextProvider>
  );
};

export default Search;
