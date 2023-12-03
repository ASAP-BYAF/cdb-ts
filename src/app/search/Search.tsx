import SearchBase from "app/search/SearchBase";
import GlobalSpinnerContextProvider from "contexts/spinner/GlobalSpinnerContext";

const Search = () => {
  return (
    <GlobalSpinnerContextProvider>
      <SearchBase />
    </GlobalSpinnerContextProvider>
  );
};

export default Search;
