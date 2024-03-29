import React, { useState, useEffect } from "react";
import { getAll, getFilteredByTask } from "api/search";
import makeGroupedList from "app/search/GroupedList";
import ManagedInput from "app/search/ManagedInput";
import { useGlobalSpinnerActionsContext } from "contexts/spinner/GlobalSpinnerContext";

const SearchBase = () => {
  const [appearingList, setAppearingList] = useState<JSX.Element | undefined>();
  const [filterList, setFilterList] = useState<string[]>([]);
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
    <>
      <ManagedInput updateAllSelectedCharacterNames={setFilterList} />
      <div
        key={filterList.join()}
        className="
        w-[80%] md:w-[30%] mx-auto max-h-[70vh] overflow-y-scroll  -webkit-overflow-scrolling-touch z-20
        border-solid border-4 rounded-md border-gray-400
        "
      >
        {appearingList}
      </div>
    </>
  );
};

export default SearchBase;
