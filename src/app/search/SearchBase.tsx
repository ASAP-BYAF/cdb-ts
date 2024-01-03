import React, { useState, useEffect } from "react";
import { getAll, getFilteredByTask } from "api/search";
import makeGroupedList from "app/search/GroupedList";
import ManagedInput from "app/search/ManagedInput";
import BaseFrame from "components/BaseFrame";
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
    <BaseFrame>
      <div>
        <ManagedInput updateAllSelectedCharacterNames={setFilterList} />
        {appearingList}
        {/* <div className="md:flex">
          <ul className="mx-auto md:w-[30%] text-left">{appearingList}</ul>
          <ul className="mx-auto md:w-[30%] text-left">{appearingList}</ul>
          <ul className="mx-auto md:w-[30%] text-left">{appearingList}</ul>
        </div> */}
      </div>
    </BaseFrame>
  );
};

export default SearchBase;
