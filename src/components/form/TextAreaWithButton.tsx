import { useState, useEffect } from "react";
import OnClickButton from "components/button/OnClickButton";

type TextAreaWithButtonProps = {
  placeholder?: string;
  buttonLabel?: string;
  handleClick?: (arg: string) => {} | void | Promise<void>;
  handleOnChangeAdditional?: (arg: string) => {} | void | Promise<void>;
  plusStyleParent?: string;
  plusStyleTextArea?: string;
  plusStyleButton?: string;
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
    handleOnChangeAdditional = (x) => {},
    plusStyleParent = "",
    plusStyleTextArea = "",
    plusStyleButton = "",
    defaultValue = "",
  } = props;
  const [inputText, setInputText] = useState<string>("");

  useEffect(() => {
    setInputText(defaultValue);
  }, [defaultValue]);

  const handleOnChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newInputValue = e.target.value;
    setInputText(newInputValue);
    handleOnChangeAdditional(newInputValue);
  };

  const handleOnClick = async () => {
    handleClick(inputText);
  };

  return (
    <div className={plusStyleParent}>
      <textarea
        placeholder={placeholder}
        value={inputText}
        onChange={handleOnChange}
        className={`m-4 px-4 rounded-md outline resize ${plusStyleTextArea}`}
      />
      <OnClickButton
        label={buttonLabel}
        onclick={handleOnClick}
        plusStyle={plusStyleButton}
      />
    </div>
  );
};

export default TextAreaWithButton;
