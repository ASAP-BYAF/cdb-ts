const RefineList = (props: { charaList: (string | undefined)[] }) => {
  const { charaList } = props;
  return (
    <div className="py-4">
      {charaList.length === 0 || charaList.includes(undefined) ? (
        <span className="text-white text-2xl">全話を表示しています</span>
      ) : (
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
      )}
    </div>
  );
};

export default RefineList;
