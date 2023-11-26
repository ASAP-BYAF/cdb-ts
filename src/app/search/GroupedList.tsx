import AccordionList from "app/search/AccordionList";

type CharaAppearingDetail = {
  file_name: string;
  task_title: string;
  appearing_detail_name: string;
};

type File = CharaAppearingDetail[];

type Vol = {
  [fileId: string]: File;
};

type JsonData = {
  [volId: string]: Vol;
};

const makeGroupedList = (data: JsonData) => {
  // マップしてJSX生成
  const listItems = Object.entries(data).map(
    ([volNum, fileNumGroup], i_vol) => (
      <AccordionList
        index={volNum}
        label={`${volNum} 巻`}
        className="border-solid border-t-2 border-emerald-500 bg-emerald-500"
        initOpen={i_vol === 0 ? true : false}
      >
        <ul key={volNum}>
          {Object.entries(fileNumGroup).map(([fileNum, items], i_file) => (
            <AccordionList
              index={`${volNum}-${fileNum}`}
              label={`${fileNum}話: ${items[0]["file_name"]}`}
              className="border-solid border-t-2 border-emerald-500 bg-white"
              initOpen={i_file === 0 ? true : false}
            >
              <ul key={fileNum}>
                {items.map((item, index) => (
                  <li key={index} className="bg-emerald-100 ">
                    <span className="p-2 inline-block">
                      {item.task_title} ({item.appearing_detail_name})
                    </span>
                  </li>
                ))}
              </ul>
            </AccordionList>
          ))}
        </ul>
      </AccordionList>
    )
  );
  return listItems;
};

export default makeGroupedList;
