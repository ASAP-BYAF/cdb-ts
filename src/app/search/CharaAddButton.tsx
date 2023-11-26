const CharaAddButton = (props: { onclick: () => void }) => {
  const { onclick } = props;

  return (
    <button
      onClick={onclick}
      className="mt-4 mb-2 py-2 px-4 rounded-md outline outline-emerald-500
            hover:bg-emerald-100"
    >
      AND 検索する人物を増やす
    </button>
  );
};

export default CharaAddButton;
