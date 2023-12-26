import { useEffect, useState, useMemo } from "react";

import Dropdown from "components/dropdown/Dropdown";
import TextAreaWithButton from "components/form/TextAreaWithButton";
import { setTextRange } from "typescript";

type TextAreaWithDropdownProps = {
  options: string[];
  defaultValueTextArea?: string;
  defaultValueDropdown?: string;
  registeredId?: number;
  handleClickAdditional?: (
    e: React.MouseEvent<HTMLButtonElement>,
    valueTextArea: string,
    valueDropdown: string,
    id: number
  ) => {} | void | Promise<void>;
  label?: string;
};

const TextAreaWithDropdown = (
  props: TextAreaWithDropdownProps
): JSX.Element => {
  const {
    options,
    defaultValueTextArea = "",
    defaultValueDropdown = "",
    registeredId = -1,
    handleClickAdditional,
    label = "選択",
  } = props;

  const [ifChangeValue, setIfChangeValue] = useState<boolean>(false);
  const [valueTextArea, setValueTextArea] = useState<string>("");
  const [valueDropdown, setValueDropdown] = useState<string>("");
  const [valueTextAreaBefore, setValueTextAreaBefore] = useState<string>("");
  const [valueDropdownBefore, setValueDropdownBefore] = useState<string>("");
  const [Id, setId] = useState<number>(-1);

  useEffect(() => {
    setValueDropdownBefore(defaultValueDropdown);
    setValueDropdown(defaultValueDropdown);
  }, [defaultValueDropdown]);

  useEffect(() => {
    setValueTextAreaBefore(defaultValueTextArea);
    setValueTextArea(defaultValueTextArea);
  }, [defaultValueTextArea]);

  useEffect(() => {
    setId(registeredId);
  }, [registeredId]);

  useMemo(() => {
    if (
      (valueDropdown !== valueDropdownBefore ||
        valueTextArea !== valueTextAreaBefore) &&
      valueDropdown !== "" &&
      valueTextArea !== ""
    ) {
      setIfChangeValue(true);
    } else {
      setIfChangeValue(false);
    }
  }, [valueDropdown, valueTextArea]);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    text: string
  ): Promise<void> => {
    try {
      setIfChangeValue(false);
      setValueDropdownBefore(valueDropdown);
      setValueTextAreaBefore(valueTextArea);
      handleClickAdditional &&
        handleClickAdditional(e, valueTextArea, valueDropdown, Id);
    } catch {
      console.error("error");
    }
  };

  return (
    <div id={String(Id)}>
      <TextAreaWithButton
        defaultValue={defaultValueTextArea}
        handleClick={[(e, text) => handleClick(e, text)]}
        plusStyleButton={[ifChangeValue ? "inline-block" : "hidden"]}
        handleOnChangeAdditional={(newText) => setValueTextArea(newText)}
      />
      <Dropdown
        label={label}
        providedOptions={options}
        handleChange={(e) => {
          setValueDropdown(e.currentTarget.value);
        }}
        defaultValue={defaultValueDropdown}
      />
    </div>
  );
};

export default TextAreaWithDropdown;
