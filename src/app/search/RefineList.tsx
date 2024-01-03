const SearchCondiList = (props: { charaList: (string | undefined)[] }) => {
  const { charaList } = props;

  let content: JSX.Element = <></>;
  if (charaList.length === 0 || charaList.includes(undefined)) {
    content = <span className="text-white text-2xl">全話を表示しています</span>;
  } else if (charaList.length === 1) {
    content = (
      <>
        <span className="text-white text-2xl">以下の人物で検索しました</span>
        <div className="overflow-x-auto whitespace-nowrap">
          {charaList.map((component) => (
            <span className="bg-amber-300 text-black inline-block rounded-3xl my-4 mx-2 p-2">
              {component}
            </span>
          ))}
        </div>
      </>
    );
  } else {
    content = (
      <>
        <span className="text-white text-2xl">
          以下の人物で AND 検索しました
        </span>
        <div className="overflow-x-auto whitespace-nowrap">
          {charaList.map((component) => (
            <span className="bg-amber-300 text-black inline-block rounded-3xl my-4 mx-2 p-2">
              {component}
            </span>
          ))}
        </div>
      </>
    );
  }

  return <div className="pt-4">{content}</div>;
};

export default SearchCondiList;
