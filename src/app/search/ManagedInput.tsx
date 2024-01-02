import React, { useState, useEffect } from "react";
import SearchCondiList from "./SearchCondiList";
import { getTaskAll } from "api/task";
import { useGlobalSpinnerActionsContext } from "contexts/spinner/GlobalSpinnerContext";
import MyCheckBox from "./CheckBox";

type Chara = {
  id: number;
  title: string;
};

type Item = {
  id: number;
  name: string;
};

type ManagedInputProps = {
  updateAllSelectedCharacterNames: React.Dispatch<
    React.SetStateAction<string[]>
  >;
};

const ManagedInput = (props: ManagedInputProps): JSX.Element => {
  const { updateAllSelectedCharacterNames } = props;
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItemsName, setSelectedItemsName] = useState<string[]>([]);
  const setGlobalSpinner = useGlobalSpinnerActionsContext();

  const renameTitleToName = (arr: Chara[]) => {
    return arr.map((obj: Chara) => ({
      ...obj,
      name: obj.title,
      title: undefined,
    }));
  };

  const getNamesByIds = (ids: number[]): string[] => {
    return ids.flatMap((id) => {
      const itemsWithId = items.filter((item) => item.id === id);
      return itemsWithId.map((item) => item.name);
    });
  };

  const getAllChara = async () => {
    try {
      setGlobalSpinner(true);
      const res = await getTaskAll();
      const res_ = renameTitleToName(res);
      setItems(res_);
      return;
    } catch {
      console.error("error");
    } finally {
      setGlobalSpinner(false);
    }
  };

  useEffect(() => {
    getAllChara();
  }, []);

  // 引数の型が G2WButton の onclick と違うがこれでいいのか？
  // 一応、動いてはいる。
  const filterAndSetSelectedCharacters = async (charaNames: string[]) => {
    const filteredCharaNames = charaNames.filter(
      (item) => item !== undefined && item.trim() !== ""
    );
    setSelectedItemsName(filteredCharaNames);
    updateAllSelectedCharacterNames(filteredCharaNames);
  };

  return (
    <div className="text-white">
      <p className="text-lg md:text-2xl py-4">
        選択した全てのキャラが登場する話数を検索
      </p>
      <MyCheckBox
        items={items}
        handleSubmitProvided={(ids) =>
          filterAndSetSelectedCharacters(getNamesByIds(ids))
        }
      />
      {/* <SearchCondiList charaList={selectedItemsName} /> */}
    </div>
  );
};

export default ManagedInput;
