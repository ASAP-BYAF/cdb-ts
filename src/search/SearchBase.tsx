import React, { useState, useEffect } from "react";
import { getAll, getFilteredByTask } from "api/search";
import makeGroupedList from "search/GroupedList";
import ParentComponent from "search/DuplicateButton";
import BaseFrame from "BaseFrame";
import { useGlobalSpinnerActionsContext } from "spinner/GlobalSpinnerContext";

const SearchBase = () => {
  const [appearingList, setAppearingList] = useState<
    JSX.Element[] | undefined
  >();
  const [filterList, setFilterList] = useState([]);
  const setGlobalSpinner = useGlobalSpinnerActionsContext();

  const getAllAndMakeGroup = async () => {
    try {
      setGlobalSpinner(true);
      const res = await getAll();
      setAppearingList(makeGroupedList(res));
    } catch (error) {
      console.error(error);
    } finally {
      setGlobalSpinner(false);
    }
  };

  const getFilteredAndMakeGroup = async (
    filterList: (string | undefined)[]
  ) => {
    try {
      setGlobalSpinner(true);
      const res = await getFilteredByTask(filterList);
      setAppearingList(makeGroupedList(res));
    } catch (error) {
      console.error(error);
    } finally {
      setGlobalSpinner(false);
    }
  };

  useEffect(() => {
    getAllAndMakeGroup();
  }, []);

  useEffect(() => {
    getFilteredAndMakeGroup(filterList);
  }, [filterList]);

  return (
    <BaseFrame>
      <div>
        <ParentComponent onChangeAllValue={setFilterList} />
        <ul className="mx-auto md:w-[50%] text-left">{appearingList}</ul>
      </div>
    </BaseFrame>
  );
};

export default SearchBase;
