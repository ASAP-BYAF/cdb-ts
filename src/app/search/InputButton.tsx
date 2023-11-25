import React, { useState } from "react";

type InputButtonProps = {
  onDeleteClick: () => {};
  onValueChange: (args: string) => {};
};
const InputButton = (props: InputButtonProps) => {
  const { onDeleteClick, onValueChange } = props;
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onValueChange(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="人物名を入力"
        value={inputValue}
        onChange={handleInputChange}
        className="mt-4 py-4 px-4 w-[60%] rounded-md border-solid border-black boreder-2 outline"
      />
      <button
        onClick={onDeleteClick}
        className="inline-block px-2 bg-emerald-500 rounded-[50%] border-solid border-black boreder-2 outline font-bold
            hover:bg-emerald-100 relative group"
      >
        ×
        <div
          className="absolute -left-4
            rounded text-[12px] w-[250%]
            font-bold text-white bg-slate-600
            opacity-50 invisible
            group-hover:visible"
        >
          人物を削除
        </div>
      </button>
    </div>
  );
};

export default InputButton;
