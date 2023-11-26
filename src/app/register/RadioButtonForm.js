import React, { useState, useMemo } from "react";
import { deleteItemFromObject } from "util/delete";
import { renameKeyInObject } from "util/rename";
import { arrayToObject, concatObject } from "util/add";
import RadioButton from "components/button/RadioButton";
import G2WButton from "components/button/G2WButton";

function RadioButtonForm(props) {
  const {
    questions,
    questionsDiff,
    options,
    handleDeleteClick = () => {},
    handleRenameClick = () => {},
    provideOptionChange = () => {},
    selectedOptionsBefore = {},
  } = props;

  const [selectedOptions, setSelectedOptions] = useState({});

  // 最初のロード時に前回までの選択状況を取得し、初期値にする。
  useMemo(() => {
    setSelectedOptions(selectedOptionsBefore);
  }, [selectedOptionsBefore]);

  // 人物名の追加、削除、変更に応じて選択状況を変化させる。
  useMemo(() => {
    const [sign, diff] = questionsDiff;

    switch (sign) {
      case "added":
        setSelectedOptions((prev) =>
          concatObject(prev, arrayToObject(diff, NaN))
        );
        break;
      case "deleted":
        setSelectedOptions((prev) => deleteItemFromObject(prev, diff));
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

  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    setSelectedOptions({
      ...selectedOptions,
      [name]: Number(value),
    });
    provideOptionChange({ name: name, value: value });
  };

  const handleResetClick = (e) => {
    const name = e.target.name;
    const nameList = document.getElementsByName(name);
    nameList.forEach((elem) => {
      elem.checked = false;
    });
    setSelectedOptions({
      ...selectedOptions,
      [name]: NaN,
    });
    provideOptionChange({ name: name, value: NaN });
  };

  const handleButtonClick = (icon) => {
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

  const memoQuestions = useMemo(() => {
    return questions.flatMap((elem) => (
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
    ));
  }, [questions, selectedOptions, options]);

  return (
    <div>
      {options.map((option) => (
        <span key={option}>{option}</span>
      ))}
      {memoQuestions}
    </div>
  );
}

export default RadioButtonForm;
