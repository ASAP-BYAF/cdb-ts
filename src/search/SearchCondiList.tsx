const SearchCondiList = (props: { charaList: (string | undefined)[] }) => {
  const { charaList } = props;
  return (
    <div>
      <span>以下の人物で AND 検索しました</span>
      <div className="py-4">
        {charaList.length === 0 || charaList.includes(undefined) ? (
          <span className="bg-emerald-100 rounded-3xl my-4 mx-2 p-2 opacity-70">
            絞り込みなし
          </span>
        ) : (
          <div className="overflow-x-auto whitespace-nowrap">
            {charaList.map((component) => (
              <span className="inline-block bg-emerald-100 rounded-3xl my-4 mx-2 p-2 opacity-70">
                {component}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCondiList;
