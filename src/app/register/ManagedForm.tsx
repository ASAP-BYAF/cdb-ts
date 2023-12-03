import { useState, useMemo, useEffect } from "react";
import { concatObject, arrayToObject } from "util/add";
import { deleteItemFromArray, deleteItemFromObjectbyValue } from "util/delete";
import { renameItemInArray, renameValueInObject } from "util/rename";
import NumberDropdown from "components/dropdown/NumberDropdown";
import {
  addTask,
  deleteTaskById,
  getTaskAll,
  getTaskByTitle,
  updateTask,
} from "api/task";
import {
  addAppearingDetail,
  deleteAppearingDetail,
  getAppearingDetailByName,
  updateAppearingDetail,
} from "api/appearingDetail";
import {
  addAppearing,
  deleteAppearing,
  getAppearingAll,
  getAppearingWithFileId,
  updateAppearing,
} from "api/appearing";
import { addFile, getFileById, updateFile } from "api/file";
import Trans2GButton from "components/button/Trans2GButton";
import BaseFrame from "components/BaseFrame";
import useAuthGuard from "auth/authGuard";
import { useGlobalSpinnerActionsContext } from "contexts/spinner/GlobalSpinnerContext";
import ADRForm from "components/form/ADRForm";
import ADRIForm from "components/form/ADRIForm";

type Character = {
  title: string;
  id: number;
};

type AppearingDetail = {
  appearing_detail: string;
  id: number;
};

type Appearing = {
  task_id: number;
  file_id: number;
  appearing_detail_id: number;
};

type OptionsIdName = {
  [key: number]: string;
};

type selectedOptions = {
  [key: string]: number;
};

const ManagedForm = (): JSX.Element => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [options, setOptions] = useState<OptionsIdName>({});
  const [optionExist, setOptionExist] = useState<boolean>(false);
  const [selectedOptionBefore, setSelectedOptionBefore] =
    useState<selectedOptions>(arrayToObject(questions, NaN));

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
      // 質問の取得
      try {
        const res = await getTaskAll();
        const resisteredQuestions = res.map((item: Character) => item["title"]);
        setQuestions((prev) => [...prev, ...resisteredQuestions]);
      } catch (error) {
        console.error(error);
      }

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

  const getTaskIdFromDb = async (questionName: string) => {
    const res = await getTaskByTitle(questionName);
    return res.id;
  };

  const handleVolNumChange = (x: string) => {
    setVolNum(Number(x));
  };
  const handleFileNumChange = (x: string) => {
    setFileNum(Number(x));
  };

  const confirmFileName = async () => {
    setGlobalSpinner(true);
    if (fileId < 0) {
      const res = await addFile(volNum, fileNum, fileName);
      setFileId(res.id);
      setFileExist(true);
    } else {
      await updateFile(fileId, volNum, fileNum, fileName);
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
    await getSelectedBefore(newOptions, fileId);
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

  // 登録情報フォームに対する追加処理 ============================================
  const handleAddQuestion = async (newQuestionName: string): Promise<void> => {
    setGlobalSpinner(true);
    //　task (人物) を DB にも追加する。
    await addTask(newQuestionName);
    setQuestions((prev) => [...prev, newQuestionName]);
    setGlobalSpinner(false);
  };

  const handleDeleteQuestion = async (questionName: string): Promise<void> => {
    setGlobalSpinner(true);
    const res = await getTaskByTitle(questionName);
    await deleteTaskById(res.id);
    setQuestions((prev) => deleteItemFromArray(prev, questionName));
    setGlobalSpinner(false);
  };

  const handleRenameQuestion = async (
    oldQuestionName: string,
    newQuestionName: string
  ): Promise<void> => {
    setGlobalSpinner(true);
    const res = await getTaskByTitle(oldQuestionName);
    await updateTask(res.id, newQuestionName);
    setQuestions((prev) =>
      renameItemInArray(prev, oldQuestionName, newQuestionName)
    );
    setGlobalSpinner(false);
  };

  const handleInitQuestion = async (questionName: string): Promise<void> => {
    setGlobalSpinner(true);
    const questionId = await getTaskIdFromDb(questionName);
    await deleteAppearing(fileId, questionId);
    setGlobalSpinner(false);
  };

  const handleSelectedOptionChange = async (
    questionName: string,
    newSeletedOptionNum: number
  ): Promise<void> => {
    setGlobalSpinner(true);
    const questionId = await getTaskIdFromDb(questionName);
    const newSeletedOptionId = Number(
      Object.keys(options)[newSeletedOptionNum]
    );
    const res = await updateAppearing(fileId, questionId, newSeletedOptionId);
    // 未選択の場合、更新する対象が見つからないので、新たに作成する。
    if (res === 404) {
      console.error(
        "未選択の場合、更新する対象が見つからないので、新たに作成する。"
      );
      await addAppearing(fileId, questionId, newSeletedOptionId);
    }
    setGlobalSpinner(false);
  };
  // ==========================================================================

  const getSelectedBefore = async (options: OptionsIdName, file_id: number) => {
    // ===== 役割 =============================================================
    //    質問 questions の各質問の選択肢 options に対して登録済みの値を取得する。
    //
    // ===== 入力 =============================================================
    //    options = {
    //               optionId_1: optionName_1,
    //               optionId_2: optionName_2,
    //               ...
    //              }
    //
    //    file_id = integer
    //
    // ===== 中で定義している変数の説明 =========================================
    //     (1) appearingList = [
    //                      {questionId: questionId_1 , fileId: fileId_1 , optionId: optionId_1 },
    //                      {questionId: questionId_2 , fileId: fileId_2 , optionId: optionId_2 },
    //                      ...
    //                     ]
    //         fileId に対して登録されているすべての登場の仕方を集めたもの。(fileId_i はすべて同一の値)
    //
    //     (2) questionIdNameObj = {questionId_1: questionName_1, questionId_2: questionName_2, ...}
    //         question に関して id と name を対応付けたオブジェクト。
    //
    //     (3) optionIdList = [optionId_1, optionId_2, ...]
    //         option に含まれる id を順に並べたもの。id とフォーム上での選択肢番号を対応付けることが目的。
    //         optionId_i のフォーム上での選択肢番号は optionNum_i = i-1。
    //
    //     (4) tmpSelectedBefore = {questionName_1: optionNum_1, questionName_2: optionNum_2, ....}
    //         question の名前と option の選択番号を結びつけている。
    //
    // ===== 処理内容 ==========================================================
    //         (1) の各要素について questionId を (2) を通して questionName を取得、
    //         optionId を (3) を通して optionNum を取得し、(4) を作成し、返す。
    //
    type QuestionIdNameObj = {
      [key: number]: string;
    };

    try {
      setGlobalSpinner(true);
      // API をたたいて (1) を取得。
      const appearlingList = await getAppearingWithFileId(file_id);

      // 全ての質問名に対して API をたたいて、質問の id を取得し、(2) を作成。
      const questionIdNameObj: QuestionIdNameObj = await questions.reduce(
        async (acc, item: string) => {
          acc = await acc;
          const questionId: number = await getTaskIdFromDb(item);
          acc = { ...acc, [questionId]: item };
          return acc;
        },
        {}
      );
      // (3) を作成
      const optionIdList = Object.keys(options);

      // (4) を作成。
      const tmpSelectedBefore = appearlingList.reduce(
        (acc: selectedOptions, item: Appearing) => {
          // (2) を通して questionName を取得
          const questionId = item["task_id"];
          const questionName = questionIdNameObj[questionId];

          // (3) を通して optionNum を取得
          const optionId = item["appearing_detail_id"];
          const optionNum = optionIdList.indexOf(String(optionId));
          return { ...acc, [questionName]: optionNum };
        },
        {}
      );
      setSelectedOptionBefore(tmpSelectedBefore);
    } catch {
      console.error(
        "Cannot access getAppearingWithFileIdFromDb before initialization"
      );
    } finally {
      setGlobalSpinner(false);
    }
  };

  useMemo(() => {
    // console.log("usememo1");
    if (Object.keys(options).length > 0) {
      setOptionExist(true);
    } else {
      setOptionExist(false);
    }
  }, [options]);

  useMemo(async () => {
    // console.log("usememo2");
    // 基本的には fileId が変化して、かつ file と option が存在するときに実行。
    // ただし、初期レンダリング時は fileId が変化しないが実行が必要。
    // そのため、選択肢があることをトリガーにして実行するようにしている。
    // (理由)
    // 初期レンダリング時はまず、 useMemo（上から順に）、その次に useEffect が実行され、
    // その後、state の変更順序に応じてそれに依存する useMemo が実行されるようである。
    // 依存関係から
    // (1) fileId, fileExist (usememo4 内)
    // (2) optionExist の順 (useeffect -> usememo1 内)
    // という順序で変更されるから。
    if (fileExist && optionExist) {
      await getSelectedBefore(options, fileId);
    }
  }, [fileId, fileExist, optionExist]);

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
        <input
          type="text"
          value={fileName}
          onChange={(e) => {
            setFileName(e.target.value);
          }}
        />
        <Trans2GButton label="confirm" onclick={confirmFileName} />

        {/* 人物の登録、登場の登録・変更 */}
        <div style={{ display: fileExist && optionExist ? "block" : "none" }}>
          <ADRIForm
            providedQuestions={questions}
            providedSelectedOptions={selectedOptionBefore}
            unselectedValue={NaN}
            options={Object.keys(options).map((item, idx) => {
              return idx;
            })}
            handleSelectChangeAdditional={handleSelectedOptionChange}
            handleClickAddAdditional={handleAddQuestion}
            handleClickDeleteAdditional={handleDeleteQuestion}
            handleClickRenameAdditional={handleRenameQuestion}
            handleClickInitAdditional={handleInitQuestion}
          />
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
