import React, { useState, useMemo } from "react";
import { deleteItemFromObject } from "util/delete";
import { renameKeyInObject } from "util/rename";
import { arrayToObject, concatObject } from "util/add";
import RadioButton from "components/button/RadioButton";
import G2WButton from "components/button/G2WButton";

type CharaFormProps = {
  questions: string[];
  questionsDiff: [string, string[]];
  options: number[];
  handleDeleteClick: (args: React.MouseEvent<HTMLButtonElement>) => {} | void;
  handleRenameClick: (args: React.MouseEvent<HTMLButtonElement>) => {} | void;
  provideOptionChange: (args: {
    name: string;
    value: string | number;
  }) => {} | void;
  selectedOptionsBefore: { [key: string]: number };
};

// RefineRadion.js から必要な情報受け取って
// キャラクターごとの登場の仕方を選択するフォームです。
// 実際の DB 上の処理は RefineRadio.js で行っています。
const CharaForm = (props: CharaFormProps): JSX.Element => {
  const {
    questions,
    questionsDiff,
    options,
    handleDeleteClick = () => {},
    handleRenameClick = () => {},
    provideOptionChange = () => {},
    selectedOptionsBefore = {},
  } = props;

  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: number;
  }>({});

  // 最初のロード時に前回までの選択状況を取得し、初期値にする。
  useMemo(() => {
    setSelectedOptions(selectedOptionsBefore);
  }, [selectedOptionsBefore]);

  // 親要素から人物名の追加、削除、変更の情報を受け取り、それに応じて選択状況を変化させる。
  useMemo(() => {
    const [sign, diff] = questionsDiff;

    switch (sign) {
      case "added":
        // selectedOptions の型に合わせて未選択は NaN としている。
        setSelectedOptions((prev) =>
          concatObject(prev, arrayToObject(diff, NaN))
        );
        break;
      case "deleted":
        let tmpSelectedOptions = selectedOptions;
        diff.forEach(
          (deletedItem) =>
            (tmpSelectedOptions = deleteItemFromObject(
              tmpSelectedOptions,
              deletedItem
            ))
        );
        setSelectedOptions(tmpSelectedOptions);
        break;
      case "renamed":
        const [oldValue, newValue] = diff;
        setSelectedOptions((prev) =>
          renameKeyInObject(prev, oldValue, newValue)
        );
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionsDiff]);

  // 選択肢が変更されたときに選択状況を画面上で変更し、変更内容を親要素に変更を伝える。
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setSelectedOptions({
      ...selectedOptions,
      [name]: Number(value),
    });
    provideOptionChange({ name: name, value: value });
  };

  // 選択肢が変更されたときに選択状況を画面上で変更し、変更内容を親要素に変更を伝える。
  const handleResetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name;
    const nameList = document.getElementsByName(name);
    nameList.forEach((elem) => {
      const inputElement = elem as HTMLInputElement;
      inputElement.checked = false;
    });

    // selectedOptions の型に合わせて未選択は NaN としている。
    setSelectedOptions({
      ...selectedOptions,
      [name]: NaN,
    });
    provideOptionChange({ name: name, value: NaN });
  };

  const handleButtonClick = (icon: string) => {
    switch (icon) {
      case "✕":
        return handleDeleteClick;
      case "✑":
        return handleRenameClick;
      case "↻":
        return handleResetClick;
      default:
        return () => {};
    }
  };

  return (
    <div>
      {options.map((option) => (
        <span key={option}>{option}</span>
      ))}
      {questions.flatMap((elem) => (
        <div key={elem} className="py-2">
          <RadioButton
            label={elem}
            options={options}
            selectedValue={selectedOptions[elem]}
            onChange={handleOptionChange}
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
    </div>
  );
};

export default CharaForm;
