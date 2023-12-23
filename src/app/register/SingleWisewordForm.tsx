import { useEffect, useState, useMemo } from "react";

import Dropdown from "components/dropdown/Dropdown";
import TextAreaWithButton from "components/form/TextAreaWithButton";

import { getWisewordAll, createWiseword, updateWiseword } from "api/wiseword";
import { getTaskIdFromDb } from "api/task";

type SingleWisewordFormProps = {
  characters: string[];
  defaultValueTextArea?: string;
  defaultValueDropdown?: string;
  registeredWisewordId?: number;
  fileId: number;
};

const SingleWisewordForm = (props: SingleWisewordFormProps): JSX.Element => {
  const {
    characters,
    defaultValueTextArea = "",
    defaultValueDropdown = "",
    registeredWisewordId,
    fileId,
  } = props;

  const [ifChangeValue, setIfChangeValue] = useState<boolean>(false);
  const [valueTextArea, setValueTextArea] = useState<string>("");
  const [valueDropdown, setValueDropdown] = useState<string>("");
  const [wisewordId, setWisewordId] = useState<number>();

  useEffect(() => {
    setValueDropdown(defaultValueDropdown);
  }, [defaultValueDropdown]);

  useEffect(() => {
    setValueTextArea(defaultValueTextArea);
  }, [defaultValueTextArea]);

  useEffect(() => {
    setWisewordId(registeredWisewordId);
  }, [registeredWisewordId]);

  useMemo(() => {
    if (
      (valueDropdown !== defaultValueDropdown ||
        valueTextArea !== defaultValueTextArea) &&
      valueDropdown !== "" &&
      valueTextArea !== ""
    ) {
      setIfChangeValue(true);
    } else {
      setIfChangeValue(false);
    }
  }, [valueDropdown, valueTextArea]);

  const addOrUpdateWisewordonDB = () => {
    try {
      if (wisewordId === undefined) {
        addWisewordonDB();
      } else {
        updateWisewordonDB();
      }
      setIfChangeValue(false);
    } catch {
      console.error("error");
    }
  };

  const addWisewordonDB = async () => {
    try {
      const charaId = await getTaskIdFromDb(valueDropdown);
      const res = await createWiseword({
        phrase: valueTextArea,
        task_id: charaId,
        file_id: fileId,
      });
      setWisewordId(res.id);
    } catch {
      console.error("error");
    }
  };

  const updateWisewordonDB = async () => {
    try {
      const charaId = await getTaskIdFromDb(valueDropdown);
      if (wisewordId !== undefined) {
        await updateWiseword(wisewordId, {
          phrase: valueTextArea,
          task_id: charaId,
          file_id: fileId,
        });
      }
    } catch {
      console.error("error");
    }
  };

  return (
    <>
      <TextAreaWithButton
        defaultValue={defaultValueTextArea}
        handleClick={[(e, text) => addOrUpdateWisewordonDB()]}
        plusStyleButton={[ifChangeValue ? "inline-block" : "hidden"]}
        handleOnChangeAdditional={(newText) => setValueTextArea(newText)}
      />
      <Dropdown
        label="<-- 発言した人物を選択"
        providedOptions={characters}
        handleChange={(e) => {
          setValueDropdown(e.currentTarget.value);
        }}
        defaultValue={defaultValueDropdown}
      />
    </>
  );
};

export default SingleWisewordForm;
