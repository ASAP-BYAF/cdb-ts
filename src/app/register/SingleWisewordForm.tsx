import { useEffect, useState, useMemo } from "react";

import TextAreaWithDropdown from "components/form/TextAreaWithDropdown";

import { createWiseword, updateWiseword } from "api/wiseword";
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
    registeredWisewordId = -1,
    fileId,
  } = props;

  const [wisewordId, setWisewordId] = useState<number>();

  useEffect(() => {
    setWisewordId(registeredWisewordId);
  }, [registeredWisewordId]);

  const addOrUpdateWisewordOnDB = async (
    e: React.MouseEvent<HTMLButtonElement>,
    valueTextArea: string,
    valueDropdown: string,
    id: number
  ): Promise<void> => {
    try {
      if (id === -1) {
        await addWisewordOnDB(valueDropdown, valueTextArea);
      } else {
        await updateWisewordOnDB(id, valueDropdown, valueTextArea);
      }
    } catch {
      console.error("error");
    }
  };

  const addWisewordOnDB = async (
    valueDropdown: string,
    valueTextArea: string
  ) => {
    try {
      const charaId = await getTaskIdFromDb(valueDropdown);
      const res = await createWiseword({
        phrase: valueTextArea,
        task_id: charaId,
        file_id: fileId,
      });
      setWisewordId(res["id"]);
    } catch {
      console.error("error");
    }
  };

  const updateWisewordOnDB = async (
    wisewordId: number,
    valueDropdown: string,
    valueTextArea: string
  ) => {
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
    <TextAreaWithDropdown
      options={characters}
      defaultValueDropdown={defaultValueDropdown}
      defaultValueTextArea={defaultValueTextArea}
      label="<-- 発言者"
      registeredId={wisewordId && wisewordId}
      handleClickAdditional={(e, valueTextArea, valueDropdown, id) =>
        addOrUpdateWisewordOnDB(e, valueTextArea, valueDropdown, id)
      }
    />
  );
};

export default SingleWisewordForm;
