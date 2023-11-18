import SpinnerProviderWrapper from "spinner/wrapper";
import SearchBase from "search/SearchBase";

const Search = () => {
  return (
    <SpinnerProviderWrapper>
      <SearchBase />
    </SpinnerProviderWrapper>
  );
};

export default Search;
