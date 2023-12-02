import SearchBase from "app/search/SearchBase";
import GlobalSpinnerContextProvider from "components/spinner/GlobalSpinnerContext";

const Search = () => {
  return (
    <GlobalSpinnerContextProvider>
      <SearchBase />
    </GlobalSpinnerContextProvider>
  );
};

export default Search;
