import SpinnerProviderWrapper from "components/spinner/wrapper";
import SearchBase from "app/search/SearchBase";

const Search = () => {
  return (
    <SpinnerProviderWrapper>
      <SearchBase />
    </SpinnerProviderWrapper>
  );
};

export default Search;
