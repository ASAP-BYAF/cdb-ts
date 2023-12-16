import { useState, useMemo, useEffect } from "react";
import { arrayToObject } from "util/add";
import { deleteItemFromArray } from "util/delete";
import { renameItemInArray } from "util/rename";
import {
  addTask,
  deleteTaskById,
  getTaskAll,
  getTaskByTitle,
  updateTask,
} from "api/task";
import {
  addAppearing,
  deleteAppearing,
  getAppearingWithFileId,
  updateAppearing,
} from "api/appearing";
import useAuthGuard from "auth/authGuard";
import { useGlobalSpinnerActionsContext } from "contexts/spinner/GlobalSpinnerContext";
import ADRIForm from "components/form/ADRIForm";
import TextAreaWithButton from "components/form/TextAreaWithButton";

type Character = {
  title: string;
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

type WisewordPersonFromProps = {
  options: OptionsIdName;
  fileId: number;
};

const WisewordPersonFrom = (props: WisewordPersonFromProps): JSX.Element => {
  const { options, fileId } = props;

  const [questions, setQuestions] = useState<string[]>([]);
  const [selectedOptionBefore, setSelectedOptionBefore] =
    useState<selectedOptions>(arrayToObject(questions, NaN));

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
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTaskIdFromDb = async (questionName: string) => {
    const res = await getTaskByTitle(questionName);
    return res.id;
  };

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

  useMemo(async () => {
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
      const appearlingList = await getAppearingWithFileId(fileId);

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
  }, [options, fileId]);

  console.log("selectedOptionBefore2");
  console.log(selectedOptionBefore);

  return (
    <TextAreaWithButton />
    // <ADRIForm
    //   providedQuestions={questions}
    //   providedSelectedOptions={selectedOptionBefore}
    //   unselectedValue={NaN}
    //   options={Object.keys(options).map((item, idx) => {
    //     return idx;
    //   })}
    //   handleSelectChangeAdditional={handleSelectedOptionChange}
    //   handleClickAddAdditional={handleAddQuestion}
    //   handleClickDeleteAdditional={handleDeleteQuestion}
    //   handleClickRenameAdditional={handleRenameQuestion}
    //   handleClickInitAdditional={handleInitQuestion}
    // />
  );
};

export default WisewordPersonFrom;
