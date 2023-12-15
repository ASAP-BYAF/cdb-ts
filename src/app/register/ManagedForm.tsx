import { useState, useMemo, useEffect } from "react";
import { concatObject } from "util/add";
import { deleteItemFromObjectbyValue } from "util/delete";
import { renameValueInObject } from "util/rename";
import NumberDropdown from "components/dropdown/NumberDropdown";

import {
  addAppearingDetail,
  deleteAppearingDetail,
  getAppearingDetailByName,
  updateAppearingDetail,
} from "api/appearingDetail";
import { getAppearingAll } from "api/appearing";

import { addFile, getFileById, updateFile } from "api/file";
import BaseFrame from "components/BaseFrame";
import useAuthGuard from "auth/authGuard";
import { useGlobalSpinnerActionsContext } from "contexts/spinner/GlobalSpinnerContext";
import ADRForm from "components/form/ADRForm";
import TextAreaWithButton from "components/form/TextAreaWithButton";
import AppearingDetailForm from "./AppearingDetailForm";

type AppearingDetail = {
  appearing_detail: string;
  id: number;
};

type OptionsIdName = {
  [key: number]: string;
};

const ManagedForm = (): JSX.Element => {
  const [options, setOptions] = useState<OptionsIdName>({});
  const [optionExist, setOptionExist] = useState<boolean>(false);

  // (volNum, fileNum, fileName) の組と fileId が 1:1 で対応します。
  const [volNum, setVolNum] = useState<number>(1);
  const [fileNum, setFileNum] = useState<number>(1);
  const [fileName, setFileName] = useState<string>("");
  const [fileId, setFileId] = useState<number>(-1);
  const [fileExist, setFileExist] = useState<boolean>(false);

  const setGlobalSpinner = useGlobalSpinnerActionsContext();

  // 認証ガード
  useAuthGuard();

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

  const handleVolNumChange = (x: string) => {
    setVolNum(Number(x));
  };
  const handleFileNumChange = (x: string) => {
    setFileNum(Number(x));
  };

  const confirmFileName = async (filename: string) => {
    setGlobalSpinner(true);
    if (fileId < 0) {
      const res = await addFile(volNum, fileNum, filename);
      setFileId(res.id);
      setFileExist(true);
    } else {
      await updateFile(fileId, volNum, fileNum, filename);
    }
    setGlobalSpinner(false);
  };

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
      setOptionExist(true);
    } else {
      setOptionExist(false);
    }
  }, [options]);

  // 巻数あるいはファイル番号が変更されたときにファイルの情報を更新
  useMemo(async () => {
    // console.log("usememo4");
    const res = await getFileById(volNum, fileNum);
    if (res.message === "None") {
      setFileName("");
      setFileId(-1);
      setFileExist(false);
    } else {
      setFileName(res.file_name);
      setFileId(res.id);
      setFileExist(true);
    }
  }, [volNum, fileNum]);

  return (
    <BaseFrame>
      <>
        {/* 事件の巻数、話数、名前を登録 */}
        <NumberDropdown
          n_st={1}
          n_ed={103}
          label="巻"
          handleChange={handleVolNumChange}
        />
        <NumberDropdown
          n_st={1}
          n_ed={11}
          label="話"
          handleChange={handleFileNumChange}
        />
        <TextAreaWithButton
          placeholder="ファイル名を入力"
          defaultValue={fileName}
          handleClick={[confirmFileName]}
          plusStyleButton={[
            "rounded-md outline outline-emerald-500 bg-emerald-500 font-bold hover:bg-white",
          ]}
        />
        {/* 人物の登録、登場の登録・変更 */}
        <div style={{ display: fileExist && optionExist ? "block" : "none" }}>
          <AppearingDetailForm options={options} fileId={fileId} />
        </div>
        <hr></hr>
        <ADRForm
          providedOptions={Object.values(options)}
          handleClickAddAdditional={handleAddOption}
          handleClickDeleteAdditional={handleDeleteOption}
          handleClickRenameAdditional={handleRenameOption}
        />
      </>
    </BaseFrame>
  );
};

export default ManagedForm;
