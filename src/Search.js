import { useState, useEffect, useMemo } from "react";
import { getAll } from "./api/search";
import { getFilteredByTask } from "./api/search";
import makeGroupedList from "./GroupedList";
import ParentComponent from "./button/DuplicateButton";
import BaseFrame from "./BaseFrame";

const Search = () => {
  const [appearingList, setAppearingList] = useState([]);
  const [filterList, setFilterList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAll();
        setAppearingList(res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const memoAppearingList = useMemo(() => {
    const res = makeGroupedList(appearingList);
    return res;
  }, [appearingList]);

  useMemo(async () => {
    const res = await getFilteredByTask(filterList);
    setAppearingList(res);
  }, [filterList]);

  return (
    <BaseFrame>
      <ParentComponent onChangeAllValue={setFilterList} />
      <ul className="mx-auto w-[50%] text-left mb-10">{memoAppearingList}</ul>
    </BaseFrame>
  );
};

export default Search;
