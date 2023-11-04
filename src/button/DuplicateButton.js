import React, { useState } from "react";
import InputButtonComponent from "./InputButtonComponent";

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
    if (filteredArray.length > 0 && !filteredArray.includes(undefined)) {
      onChangeAllValue(filteredArray);
    }
  };

  return (
    <div>
      <div className="flex justify-center flex-wrap">
        {inputComponents.map((component) => (
          <InputButtonComponent
            key={component.id}
            onDeleteClick={() => handleDeleteComponent(component.id)}
            onValueChange={(value) => {
              // Update the input value for the component
              component.inputValue = value;
            }}
          />
        ))}
      </div>
      <button
        onClick={handleAddComponent}
        className="mb-2 py-2 px-4 rounded-md outline outline-emerald-500
            hover:bg-emerald-100"
      >
        AND 検索する人物を増やす
      </button>
      <button
        onClick={handleGetAllValues}
        className="mx-4 px-2 rounded-md outline outline-emerald-500 bg-emerald-500
            font-bold hover:bg-white"
      >
        検索
      </button>
      <div>
        <span>以下の人物で AND 検索しました</span>
        <p>
          <pre>
            {allInputValues.length === 0 || allInputValues.includes(undefined)
              ? "絞り込みなし"
              : allInputValues.join(" / ")}
          </pre>
        </p>
      </div>
    </div>
  );
};

export default ParentComponent;
