import React, { useState } from "react";
import InputButton from "app/search/InputButton";
import SearchExec from "app/search/SearchExec";
import CharaAddButton from "./CharaAddButton";
import SearchCondiList from "./SearchCondiList";
import { deleteItemFromObject } from "util/delete";
import { concatObject } from "util/add";

const ParentComponent = ({ onChangeAllValue }) => {
  const [inputComponents, setInputComponents] = useState({ 1: "" });
  const [allInputValues, setAllInputValues] = useState([]);
  const [serialNum, setSerialNum] = useState(1);

  const handleAddComponent = () => {
    const newId = serialNum + 1;
    setSerialNum(newId);
    setInputComponents(concatObject(inputComponents, { [newId]: "" }));
  };

  const handleDeleteComponent = (id) => {
    const updatedComponents = deleteItemFromObject(inputComponents, id);
    setInputComponents(updatedComponents);
  };

  const handleGetAllValues = async () => {
    const allValues = [];
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
      <CharaAddButton onclick={handleAddComponent} />
      <SearchExec onclick={handleGetAllValues} />
      <SearchCondiList charaList={allInputValues} />
    </div>
  );
};

export default ParentComponent;
