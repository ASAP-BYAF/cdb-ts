import { useEffect, useState, useMemo } from "react";

import Dropdown from "components/dropdown/Dropdown";
import TextAreaWithButton from "components/form/TextAreaWithButton";

type TextAreaWithDropdownProps = {
  options: string[];
  defaultValueTextArea?: string;
  defaultValueDropdown?: string;
  AreaId?: number;
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
    AreaId = -1,
    handleClickAdditional,
    label = "選択",
  } = props;

  const [ifChangeValue, setIfChangeValue] = useState<boolean>(false);
  const [valueTextArea, setValueTextArea] = useState<string>("");
  const [valueDropdown, setValueDropdown] = useState<string>("");
  const [valueTextAreaBefore, setValueTextAreaBefore] = useState<string>("");
  const [valueDropdownBefore, setValueDropdownBefore] = useState<string>("");

  useEffect(() => {
    setValueDropdownBefore(defaultValueDropdown);
    setValueDropdown(defaultValueDropdown);
  }, [defaultValueDropdown]);

  useEffect(() => {
    setValueTextAreaBefore(defaultValueTextArea);
    setValueTextArea(defaultValueTextArea);
  }, [defaultValueTextArea]);

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
        handleClickAdditional(e, valueTextArea, valueDropdown, AreaId);
    } catch {
      console.error("error");
    }
  };

  return (
    <>
      <TextAreaWithButton
        defaultValue={defaultValueTextArea}
        handleClick={[(e, text) => handleClick(e, text)]}
        plusStyleButton={[ifChangeValue ? "inline-block" : "hidden"]}
        handleOnChangeAdditional={(newText) => setValueTextArea(newText)}
        areaId={String(AreaId)}
      />
      <Dropdown
        label={label}
        providedOptions={options}
        handleChange={(e) => {
          setValueDropdown(e.currentTarget.value);
        }}
        defaultValue={defaultValueDropdown}
      />
    </>
  );
};

export default TextAreaWithDropdown;
