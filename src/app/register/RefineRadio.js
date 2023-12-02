import RefineRadioBase from "app/register/RefineRadioBase";
import GlobalSpinnerContextProvider from "components/spinner/GlobalSpinnerContext";

const Search = () => {
  return (
    <GlobalSpinnerContextProvider>
      <RefineRadioBase />
    </GlobalSpinnerContextProvider>
  );
};

export default Search;
