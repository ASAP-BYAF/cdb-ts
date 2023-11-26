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

  // 選択状況を得たときはそれを各選択制の初期値に設定します。
  useMemo(() => {
    setSelectedOptions(selectedOptionsBefore);
  }, [selectedOptionsBefore]);

  useMemo(() => {
    const sign = questionsDiff[0];
    const diff = questionsDiff[1];
    if (sign === "added") {
      setSelectedOptions((prev) =>
        concatObject(prev, arrayToObject(diff, NaN))
      );
    } else if (sign === "deleted") {
      setSelectedOptions((prev) => deleteItemFromObject(prev, diff));
    } else if (sign === "renamed") {
      const oldValue = diff[0];
      const newValue = diff[1];
      setSelectedOptions((prev) => renameKeyInObject(prev, oldValue, newValue));
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

  const memoQuestions = useMemo(() => {
    const tmpOptionList = [];
    tmpOptionList.push(
      options.map((option) => <span key={option}>{option}</span>)
    );
    questions.forEach((elem, idx) => {
      tmpOptionList.push(
        <div key={elem} className="py-1">
          <RadioButton
            label={elem}
            options={options}
            selectedValue={selectedOptions[elem]}
            onChange={handleOptionChange}
          />
          <G2WButton
            label="✕"
            name={elem}
            onclick={handleDeleteClick}
            plusStyle="mx-1 px-1 text-white hover:text-emerald-500"
          />
          <G2WButton
            label="✑"
            name={elem}
            onclick={handleRenameClick}
            plusStyle="mx-1 px-1 text-white hover:text-emerald-500"
          />
          <G2WButton
            label="↻"
            name={elem}
            onclick={handleResetClick}
            plusStyle="mx-1 px-1 text-white hover:text-emerald-500"
          />
        </div>
      );
    });
    return tmpOptionList;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions, selectedOptions, options]);

  return <div>{memoQuestions}</div>;
}

export default RadioButtonForm;
