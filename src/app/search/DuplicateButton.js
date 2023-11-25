import React, { useState } from "react";
import InputButton from "app/search/InputButton";
import SearchExec from "app/search/SearchExec";
import CharaAddButton from "./CharaAddButton";
import SearchCondiList from "./SearchCondiList";

const ParentComponent = ({ onChangeAllValue }) => {
  const [inputComponents, setInputComponents] = useState([{ id: 1 }]);
  const [allInputValues, setAllInputValues] = useState([]);

  const handleAddComponent = () => {
    const newId = inputComponents.length + 1;
    setInputComponents([...inputComponents, { id: newId }]);
  };

  const handleDeleteComponent = (id) => {
    const updatedComponents = inputComponents.filter(
      (component) => component.id !== id
    );
    setInputComponents(updatedComponents);
  };

  const handleGetAllValues = async () => {
    const allValues = [];
    inputComponents.forEach((component) => {
      allValues.push(component.inputValue);
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
        {inputComponents.map((component) => (
          <InputButton
            key={component.id}
            onDeleteClick={() => handleDeleteComponent(component.id)}
            onValueChange={(value) => {
              // Update the input value for the component
              component.inputValue = value;
            }}
          />
        ))}
      </div>
      <CharaAddButton onclick={handleAddComponent} />
      <SearchExec onclick={handleGetAllValues} />
      <SearchCondiList charaList={allInputValues} />
    </div>
  );
};

export default ParentComponent;
