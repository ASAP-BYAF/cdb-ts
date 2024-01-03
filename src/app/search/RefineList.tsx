const SearchCondiList = (props: { charaList: (string | undefined)[] }) => {
  const { charaList } = props;

  let content: JSX.Element = <></>;
  if (charaList.length === 0 || charaList.includes(undefined)) {
    content = <span className="text-white text-lg">全話を表示しています</span>;
  } else {
    const subcontent = (
      <div className="overflow-x-auto whitespace-nowrap">
        {charaList.map((component) => (
          <span className="bg-amber-300 text-black inline-block rounded-3xl m-2 p-2">
            {component}
          </span>
        ))}
      </div>
    );
    if (charaList.length === 1) {
      content = (
        <>
          <span className="text-white text-lg">以下の人物で検索しました</span>
          {subcontent}
        </>
      );
    } else {
      content = (
        <>
          <span className="text-white text-lg">
            以下の人物で AND 検索しました
          </span>
          {subcontent}
        </>
      );
    }
  }

  return <div className="my-4 sticky top-[40px] z-20">{content}</div>;
};

export default SearchCondiList;
