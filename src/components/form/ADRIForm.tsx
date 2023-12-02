import { useState, useEffect } from "react";
import G2WButton from "components/button/G2WButton";
import RadioButton from "components/button/RadioButton";
import { useGlobalModalActionsContext } from "components/modal/normal/GlobalModalContext";
import { useGlobalModalWithInputActionsContext } from "components/modal/with-input/GlobalModalWithInputContext";
import { renameItemInArray, renameKeyInObject } from "util/rename";
import { deleteItemFromArray, deleteItemFromObjectbyKey } from "util/delete";

type ADRIFormProps = {
  providedQuestions?: string[];
  providedSelectedOptions?: { [key: string]: number };
  unselectedValue: number;
  options: number[];
  handleSelectChangeAdditional?: (arg?: string) => {} | void;
  handleClickAddAdditional?: (arg?: string) => {} | void;
  handleClickDeleteAdditional?: (arg?: string) => {} | void;
  handleClickRenameAdditional?: (arg?: string, arg2?: string) => {} | void;
  handleClickInitAdditional?: (arg?: string) => {} | void;
};

// 質問の追加、削除、名前の変更、選択状況の初期化ができるフォームです。
// Additional の関数を渡すことでそれぞれの動作に処理を追加できます。
// ADRI は Add, Delete, Rename, Initialize の頭文字をとっています。
const ADRIForm = (props: ADRIFormProps): JSX.Element => {
  const {
    providedQuestions = ["tmp1", "tmp2"],
    providedSelectedOptions = { tmp1: 1, tmp2: 2 },
    unselectedValue,
    options,
    handleSelectChangeAdditional = () => {},
    handleClickAddAdditional = () => {},
    handleClickDeleteAdditional = () => {},
    handleClickRenameAdditional = () => {},
    handleClickInitAdditional = () => {},
  } = props;

  const setGlobalModal = useGlobalModalActionsContext();
  const setGlobalModalWithInput = useGlobalModalWithInputActionsContext();

  const [questionInput, setQuestionInput] = useState<string>("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [allQuestions, setAllQuestions] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: number;
  }>({});

  // // 選択状況の初期値があれば設定する。
  useEffect(() => {
    setSelectedOptions(providedSelectedOptions);
  }, []);
  // }, [providedSelectedOptions]);

  // 渡された質問のリストを使う。
  useEffect(() => {
    setQuestions(providedQuestions);
    setAllQuestions(providedQuestions);
  }, []);
  // }, [providedQuestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value.toLowerCase();
    console.log(newText);
    setQuestionInput(newText);
    const filteredQuestions = allQuestions.filter((item: string) =>
      item.toLowerCase().includes(newText)
    );
    console.log(filteredQuestions);
    // 配列の中身を比較。中身が異なるときだけ questions の状態を更新。
    // 単に questions !== filteredQuestions とするだけではだめだった。
    if (JSON.stringify(questions) !== JSON.stringify(filteredQuestions)) {
      setQuestions(filteredQuestions);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setSelectedOptions({
      ...selectedOptions,
      [name]: Number(value),
    });
    handleSelectChangeAdditional();
  };

  const handleClickAdd = async () => {
    setQuestions((prev) => [...prev, questionInput]);
    setAllQuestions((prev) => [...prev, questionInput]);
    // handleClickAddAdditional();
  };

  const handleClickRename = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const oldQuestionName = e.currentTarget.name;
    const newQuestionName = await new Promise<string>((resolve) => {
      setGlobalModalWithInput({
        onClose: resolve,
        title: "新しい選択肢を入力してください。",
        message: "空白のみにはできません。",
        oldText: oldQuestionName,
      });
    });
    setGlobalModalWithInput(undefined);
    const newQuestionName_trimed = newQuestionName.trim();
    if (
      newQuestionName !== "cancel" &&
      newQuestionName_trimed &&
      !allQuestions.includes(newQuestionName_trimed)
    ) {
      setQuestions((prev) =>
        renameItemInArray(prev, oldQuestionName, newQuestionName_trimed)
      );
      setAllQuestions((prev) =>
        renameItemInArray(prev, oldQuestionName, newQuestionName_trimed)
      );
      setSelectedOptions((prev) =>
        renameKeyInObject(prev, oldQuestionName, newQuestionName_trimed)
      );
      // ここに追加処理を記載
      // handleClickRenameAdditional(questionName, newQuestionName_trimed);
    }
  };

  const handleClickDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const questionName = e.currentTarget.name;
    const ret = await new Promise((resolve) => {
      setGlobalModal({
        onClose: resolve,
        title: "削除します。よろしいですか?",
        message: "削除すると二度と元に戻せません。",
      });
    });
    setGlobalModal(undefined);
    if (ret === "ok") {
      setQuestions((prev) => deleteItemFromArray(prev, questionName));
      setAllQuestions((prev) => deleteItemFromArray(prev, questionName));
      setSelectedOptions((prev) =>
        deleteItemFromObjectbyKey(prev, questionName)
      );
      // ここに追加処理を記載
      // handleClickDeleteAdditional(optionName);
    }
  };

  // 選択肢が変更されたときに選択状況を画面上で変更し、変更内容を親要素に変更を伝える。
  const handleClickInit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const optionName = e.currentTarget.name;
    const nameList = document.getElementsByName(optionName);
    nameList.forEach((elem) => {
      const inputElement = elem as HTMLInputElement;
      inputElement.checked = false;
    });
    console.log(selectedOptions);

    // handleClickInitAdditional(optionName);
    // // selectedOptions の型に合わせて未選択は NaN としている。
    setSelectedOptions({
      ...selectedOptions,
      [optionName]: unselectedValue,
    });
    // provideSelectChange({ name: name, value: NaN });
  };

  const handleButtonClick = (icon: string) => {
    switch (icon) {
      case "✕":
        return handleClickDelete;
      case "✑":
        return handleClickRename;
      case "↻":
        return handleClickInit;
      default:
        return () => {};
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="人物を絞り込む"
        onChange={handleInputChange}
      />
      <button
        className="addQuestionButton"
        type="button"
        onClick={handleClickAdd}
        style={{ display: questions.length === 0 ? "inline-block" : "none" }}
      >
        add
      </button>

      {options.map((option) => (
        <span key={option}>{option}</span>
      ))}

      {questions.flatMap((elem) => (
        <div key={elem} className="py-2">
          <RadioButton
            label={elem}
            options={options}
            selectedValue={selectedOptions[elem]}
            onChange={handleSelectChange}
          />
          {["✕", "✑", "↻"].map((icon, idx) => (
            <G2WButton
              key={idx}
              label={icon}
              name={elem}
              onclick={handleButtonClick(icon)}
              plusStyle="mx-1 px-1 text-white hover:text-emerald-500"
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default ADRIForm;
