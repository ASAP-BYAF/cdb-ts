import { useState, useMemo } from "react";
import NumberDropdown from "components/dropdown/NumberDropdown";

import { addFile, getFileById, updateFile } from "api/file";
import BaseFrame from "components/BaseFrame";
import useAuthGuard from "auth/authGuard";
import { useGlobalSpinnerActionsContext } from "contexts/spinner/GlobalSpinnerContext";
import TextAreaWithButton from "components/form/TextAreaWithButton";
import AppearingForm from "./AppearingForm";
import ToggleStatusButtonGroup from "auth/ToggleStatusButtonGroup";

const ManagedForm = (): JSX.Element => {
  // (volNum, fileNum, fileName) の組と fileId が 1:1 で対応します。
  const [volNum, setVolNum] = useState<number>(1);
  const [fileNum, setFileNum] = useState<number>(1);
  const [fileName, setFileName] = useState<string>("");
  const [fileId, setFileId] = useState<number>(-1);

  const setGlobalSpinner = useGlobalSpinnerActionsContext();

  // 認証ガード
  useAuthGuard();

  const handleVolNumChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVolNum(Number(e.currentTarget.value));
  };
  const handleFileNumChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFileNum(Number(e.currentTarget.value));
  };

  const confirmFileName = async (
    e: React.MouseEvent<HTMLButtonElement>,
    filename: string
  ) => {
    setGlobalSpinner(true);
    if (fileId < 0) {
      const res = await addFile(volNum, fileNum, filename);
      setFileId(res.id);
    } else {
      await updateFile(fileId, volNum, fileNum, filename);
    }
    setGlobalSpinner(false);
  };

  // 巻数あるいはファイル番号が変更されたときにファイルの情報を更新
  useMemo(async () => {
    // console.log("usememo4");
    const res = await getFileById(volNum, fileNum);
    if (res.message === "None") {
      setFileName("");
      setFileId(-1);
    } else {
      setFileName(res.file_name);
      setFileId(res.id);
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
          defaultValue={volNum}
          handleChange={handleVolNumChange}
        />
        <NumberDropdown
          n_st={1}
          n_ed={11}
          label="話"
          defaultValue={fileNum}
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
        <AppearingForm fileId={fileId} />
        <hr></hr>
        <div className="mt-10">
          <ToggleStatusButtonGroup />
        </div>
      </>
    </BaseFrame>
  );
};

export default ManagedForm;
