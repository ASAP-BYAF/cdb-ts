import { useState, useEffect } from "react";
import Trans2GButton from "components/button/Trans2GButton";

type TextAreaWithButtonProps = {
  placeholder?: string;
  buttonLabel?: string;
  handleClick?: (arg: string) => {} | void | Promise<void>;
  plusStyle?: string;
  defaultValue?: string;
};

// 質問の追加、削除、名前の変更、選択状況の初期化ができるフォームです。
// Additional の関数を渡すことでそれぞれの動作に処理を追加できます。
// ADRI は Add, Delete, Rename, Initialize の頭文字をとっています。
const TextAreaWithButton = (props: TextAreaWithButtonProps): JSX.Element => {
  const {
    placeholder = "ここに入力してください。",
    buttonLabel = "確定",
    handleClick = (x) => {},
    plusStyle = "",
    defaultValue = "",
  } = props;
  const [inputText, setInputText] = useState<string>("");

  useEffect(() => {
    setInputText(defaultValue);
  }, [defaultValue]);

  const handleOnClick = async () => {
    handleClick(inputText);
  };

  return (
    <div>
      <textarea
        placeholder={placeholder}
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        className={`m-4 px-4 rounded-md outline resize ${plusStyle}`}
      />
      <Trans2GButton label={buttonLabel} onclick={handleOnClick} />
    </div>
  );
};

export default TextAreaWithButton;
