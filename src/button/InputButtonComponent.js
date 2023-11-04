import React, { useState } from "react";

const InputButtonComponent = ({ onDeleteClick, onValueChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onValueChange(e.target.value);
  };

  const handleDeleteClick = () => {
    onDeleteClick();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="人物名を入力"
        value={inputValue}
        onChange={handleInputChange}
        className="my-4 py-4 px-4 w-[60%] rounded-md border-solid border-black boreder-2 outline"
      />
      <button
        onClick={handleDeleteClick}
        className="px-2 bg-emerald-500 rounded-[50%] border-solid border-black boreder-2 outline font-bold
            hover:bg-emerald-100 relative group"
      >
        ×
        {/* <p
          className="absolute -left-8 rounded text-[12px] 
            font-bold text-white px-10 bg-slate-600
            opacity-50 invisible
            group-hover:visible"
        >
          設定
        </p> */}
      </button>
    </div>
  );
};

export default InputButtonComponent;
