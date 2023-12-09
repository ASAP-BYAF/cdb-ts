import { useState, useEffect } from "react";
import OnClickButton from "components/button/OnClickButton";

type StringToVoidFunction = (arg: string) => {} | void | Promise<void>;

type TextAreaWithButtonProps = {
  plusStyleParent?: string;
  plusStyleTextArea?: string;
  placeholder?: string;
  defaultValue?: string;
  handleOnChangeAdditional?: StringToVoidFunction;
  plusStyleButton?: string[];
  buttonLabel?: string[];
  handleClick?: StringToVoidFunction[];
};

// 質問の追加、削除、名前の変更、選択状況の初期化ができるフォームです。
// Additional の関数を渡すことでそれぞれの動作に処理を追加できます。
// ADRI は Add, Delete, Rename, Initialize の頭文字をとっています。
const TextAreaWithButton = (props: TextAreaWithButtonProps): JSX.Element => {
  const {
    plusStyleParent = "",
    plusStyleTextArea = "",
    placeholder = "ここに入力してください。",
    defaultValue = "",
    handleOnChangeAdditional = (x) => {},
    plusStyleButton = [""],
    buttonLabel = ["確定"],
    handleClick = [(x) => {}],
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

  const handleOnClick = async (key: number) => {
    // 定義されているときのみクリック時の処理を実行
    handleClick[key] && handleClick[key](inputText);
  };

  return (
    <div className={plusStyleParent}>
      <textarea
        placeholder={placeholder}
        value={inputText}
        onChange={handleOnChange}
        className={`m-4 px-4 rounded-md outline resize ${plusStyleTextArea}`}
      />
      {plusStyleButton.map((style, index) => (
        <OnClickButton
          key={index}
          label={buttonLabel[index] ?? "確定"}
          onclick={() => handleOnClick(index)}
          plusStyle={style}
        />
      ))}
    </div>
  );
};

export default TextAreaWithButton;
