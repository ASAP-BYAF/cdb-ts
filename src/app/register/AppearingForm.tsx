import { useState, useMemo, useEffect } from "react";
import { concatObject } from "util/add";
import { deleteItemFromObjectbyValue } from "util/delete";
import { renameValueInObject } from "util/rename";

import {
  addAppearingDetail,
  deleteAppearingDetail,
  getAppearingDetailByName,
  updateAppearingDetail,
} from "api/appearingDetail";
import { getAppearingAll } from "api/appearing";

import useAuthGuard from "auth/authGuard";
import { useGlobalSpinnerActionsContext } from "contexts/spinner/GlobalSpinnerContext";
import ADRForm from "components/form/ADRForm";
import AppearingDetailForm from "./AppearingDetailForm";

type AppearingDetail = {
  appearing_detail: string;
  id: number;
};

type OptionsIdName = {
  [key: number]: string;
};

type AppearingFormProps = {
  fileId: number;
};

const AppearingForm = (props: AppearingFormProps): JSX.Element => {
  const { fileId } = props;

  const [options, setOptions] = useState<OptionsIdName>({});
  const [optionsExist, setOptionsExist] = useState<boolean>(false);

  const setGlobalSpinner = useGlobalSpinnerActionsContext();

  // 既に登録されている質問と選択肢を取得しました。
  useEffect(() => {
    const fetchData = async () => {
      // 選択肢の取得
      try {
        const res = await getAppearingAll();
        const registeredOptions = res.reduce(
          (accumulator: OptionsIdName, x: AppearingDetail) => {
            return { ...accumulator, [x["id"]]: x["appearing_detail"] };
          },
          {}
        );
        setOptions(registeredOptions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 登場ステータスフォームに対する追加処理 =======================================
  const handleAddOption = async (newOptionName: string): Promise<void> => {
    setGlobalSpinner(true);
    const res = await addAppearingDetail(newOptionName);
    setOptions((prev) => concatObject(prev, { [res.id]: newOptionName }));
    setGlobalSpinner(false);
  };

  const handleDeleteOption = async (oldOptionName: string): Promise<void> => {
    setGlobalSpinner(true);
    await deleteAppearingDetail(oldOptionName);
    const newOptions = deleteItemFromObjectbyValue(options, oldOptionName);
    setOptions(newOptions);
    setGlobalSpinner(false);
  };

  const handleRenameOption = async (
    oldOptionName: string,
    newOptionName: string
  ): Promise<void> => {
    setGlobalSpinner(true);
    const res = await getAppearingDetailByName(oldOptionName);
    await updateAppearingDetail(res.id, newOptionName);
    setOptions((prev) =>
      renameValueInObject(prev, oldOptionName, newOptionName)
    );
    setGlobalSpinner(false);
  };
  // ==========================================================================

  useMemo(() => {
    // console.log("usememo1");
    if (Object.keys(options).length > 0) {
      setOptionsExist(true);
    } else {
      setOptionsExist(false);
    }
  }, [options]);

  return (
    <>
      <div style={{ display: fileId > 0 && optionsExist ? "block" : "none" }}>
        <AppearingDetailForm options={options} fileId={fileId} />
      </div>
      <ADRForm
        providedOptions={Object.values(options)}
        handleClickAddAdditional={handleAddOption}
        handleClickDeleteAdditional={handleDeleteOption}
        handleClickRenameAdditional={handleRenameOption}
      />
    </>
  );
};

export default AppearingForm;
