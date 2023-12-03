import React, { useState } from "react";
import InputButton from "app/search/InputButton";
import SearchCondiList from "./SearchCondiList";
import { deleteItemFromObjectbyKey } from "util/delete";
import { concatObject } from "util/add";
import G2WButton from "components/button/G2WButton";
import Trans2GButton from "components/button/Trans2GButton";

type ManagedInputProps = {
  onChangeAllValue: React.Dispatch<React.SetStateAction<string[]>>;
};

const ManagedInput = (props: ManagedInputProps): JSX.Element => {
  const { onChangeAllValue } = props;
  const [inputComponents, setInputComponents] = useState<{
    [key: number]: string;
  }>({ 1: "" });
  const [allInputValues, setAllInputValues] = useState<string[]>([]);
  const [serialNum, setSerialNum] = useState(1);

  // 引数の型が Trans2GButton の onclick と違うがこれでいいのか？
  // 一応、動いてはいる。
  const handleAddComponent = () => {
    const newId = serialNum + 1;
    setSerialNum(newId);
    setInputComponents(concatObject(inputComponents, { [newId]: "" }));
  };

  const handleDeleteComponent = (id: number) => {
    const updatedComponents = deleteItemFromObjectbyKey(inputComponents, id);
    setInputComponents(updatedComponents);
  };

  // 引数の型が G2WButton の onclick と違うがこれでいいのか？
  // 一応、動いてはいる。
  const handleGetAllValues = async () => {
    const allValues: string[] = [];
    Object.values(inputComponents).forEach((value) => {
      allValues.push(value);
    });
    const filteredArray = allValues.filter(
      (item) => item !== undefined && item.trim() !== ""
    );
    setAllInputValues(filteredArray);
    onChangeAllValue(filteredArray);
  };

  return (
    <div>
      <div className="flex justify-center flex-wrap">
        {Object.keys(inputComponents).map((key) => {
          const key_ = Number(key);
          return (
            <InputButton
              key={key_}
              onDeleteClick={() => handleDeleteComponent(key_)}
              onValueChange={(value) => {
                // Update the input value for the component
                inputComponents[key_] = value;
              }}
            />
          );
        })}
      </div>
      <Trans2GButton
        label="AND 検索する人物を追加"
        onclick={handleAddComponent}
        plusStyle="mt-4 mb-2 py-2 px-4 "
      />
      <G2WButton
        label="検索"
        onclick={handleGetAllValues}
        plusStyle="mx-4 px-2"
      />
      <SearchCondiList charaList={allInputValues} />
    </div>
  );
};

export default ManagedInput;
