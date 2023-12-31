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
  const listItems = (
    <ul className="text-left">
      {Object.entries(data).map(([volNum, fileNumGroup], i_vol) => (
        <AccordionList
          index={volNum}
          label={`${volNum} 巻`}
          className="bg-[#be661f] outline outline-3 outline-white"
          initOpen={true}
        >
          <ul key={volNum}>
            {Object.entries(fileNumGroup).map(([fileNum, items], i_file) => (
              <AccordionList
                index={`${volNum}-${fileNum}`}
                label={`${fileNum}話: ${items[0]["file_name"]}`}
                className="bg-slate-100 outline outline-3 outline-white"
                initOpen={false}
              >
                <ul key={fileNum}>
                  {items.map((item, index) => (
                    <li
                      key={index}
                      className="bg-amber-300 outline outline-3 outline-white"
                    >
                      <span className="p-2 inline-block">
                        {item.task_title}
                      </span>
                      {item.appearing_detail_name === "現実のコマ" ? (
                        <></>
                      ) : (
                        <span className="p-2 inline-block">
                          ({item.appearing_detail_name})
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </AccordionList>
            ))}
          </ul>
        </AccordionList>
      ))}
    </ul>
  );
  return listItems;
};

export default makeGroupedList;
