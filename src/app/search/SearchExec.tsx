const SearchButton = (props: { onclick: () => {} }) => {
  const { onclick } = props;

  return (
    <button
      onClick={onclick}
      className="mx-4 px-2 rounded-md outline outline-emerald-500 bg-emerald-500
            font-bold hover:bg-white"
    >
      検索
    </button>
  );
};

export default SearchButton;
