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
import { getPreviousFileId } from "api/file";
import { useGlobalSpinnerActionsContext } from "contexts/spinner/GlobalSpinnerContext";
import ADRIForm from "components/form/ADRIForm";
import { convertArrayToObj } from "util/convert";
import { removeNaNKeys } from "util/filter";
import WisewordForm from "./WisewordForm";
import { getTaskIdFromDb } from "api/task";
import G2WButton from "components/button/G2WButton";
import { useGlobalModalActionsContext } from "contexts/modal/normal/GlobalModalContext";

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

type selectedOptionsObj = {
  [key: string]: number;
};

type AppearingDetailFormProps = {
  options: OptionsIdName;
  fileId: number;
};

const AppearingDetailForm = (props: AppearingDetailFormProps): JSX.Element => {
  const { options, fileId } = props;

  // 人物リスト
  const [questions, setQuestions] = useState<string[]>([]);
  // 登録情報がある人物リスト
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  // 既に登録されている登場データ
  const [selectedOptionBefore, setSelectedOptionBefore] =
    useState<selectedOptionsObj>(arrayToObject(questions, NaN));

  const setGlobalSpinner = useGlobalSpinnerActionsContext();
  const setGlobalModal = useGlobalModalActionsContext();

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

  // 登録情報フォームに対する追加処理 ============================================
  const handleAddQuestion = async (newQuestionName: string): Promise<void> => {
    setGlobalSpinner(true);
    //　task (人物) を DB にも追加する。
    await addTask(newQuestionName);
    setQuestions((prev) => [...prev, newQuestionName]);
    setGlobalSpinner(false);
  };

  const handleDeleteQuestion = async (questionName: string): Promise<void> => {
    deleteOnDB(questionName);
    setSelectedQuestions((prev) => deleteItemFromArray(prev, questionName));
  };

  const deleteOnDB = async (questionName: string) => {
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
    renameOnDB(oldQuestionName, newQuestionName);
    renameOnSelectedOptions(oldQuestionName, newQuestionName);
  };

  const renameOnDB = async (
    oldQuestionName: string,
    newQuestionName: string
  ) => {
    setGlobalSpinner(true);
    const res = await getTaskByTitle(oldQuestionName);
    await updateTask(res.id, newQuestionName);
    setQuestions((prev) =>
      renameItemInArray(prev, oldQuestionName, newQuestionName)
    );
    setGlobalSpinner(false);
  };

  const renameOnSelectedOptions = (
    oldQuestionName: string,
    newQuestionName: string
  ) => {
    const tmp = deleteItemFromArray(selectedQuestions, oldQuestionName);
    setSelectedQuestions([...tmp, newQuestionName]);
  };

  const handleInitQuestion = async (questionName: string): Promise<void> => {
    initOnDB(questionName);
    setSelectedQuestions((prev) => deleteItemFromArray(prev, questionName));
  };

  const initOnDB = async (questionName: string) => {
    setGlobalSpinner(true);
    const questionId = await getTaskIdFromDb(questionName);
    await deleteAppearing(fileId, questionId);
    setGlobalSpinner(false);
  };

  const handleSelectedOptionChange = async (
    questionName: string,
    newSeletedOptionNum: number
  ): Promise<void> => {
    createOrUpdateOnDB(questionName, newSeletedOptionNum);
    createOnSelectedOptions(questionName);
  };

  const createOrUpdateOnDB = async (
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

  const createOnSelectedOptions = async (
    questionName: string
  ): Promise<void> => {
    if (!selectedQuestions.includes(questionName)) {
      setSelectedQuestions((prev) => [questionName, ...prev]);
    }
  };

  // ==========================================================================

  useMemo(async () => {
    try {
      setGlobalSpinner(true);

      const appearlingList = await getAppearingWithFileId(fileId);

      const newSelectedBefore = await appearingListToSelectedBefore(
        appearlingList
      );
      setSelectedOptionBefore(newSelectedBefore);
    } catch {
      console.error(
        "Cannot access getAppearingWithFileIdFromDb before initialization"
      );
    } finally {
      setGlobalSpinner(false);
    }
  }, [options, fileId]);

  const appearingListToSelectedBefore = async (
    appearlingList: Appearing[]
  ): Promise<selectedOptionsObj> => {
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
    //     (2) questionsIdNameObj = {questionId_1: questionName_1, questionId_2: questionName_2, ...}
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

    // (2) を作成。
    const questionsList = await getTaskAll();
    const questionsIdNameObj: QuestionIdNameObj =
      convertArrayToObj(questionsList);

    // (3) を作成
    const optionIdList = Object.keys(options);

    // (4) を作成。
    const newSelectedBefore = appearlingList.reduce(
      (acc: selectedOptionsObj, item: Appearing) => {
        // (2) を通して questionName を取得
        const questionId = item["task_id"];
        const questionName = questionsIdNameObj[questionId];

        // (3) を通して optionNum を取得
        const optionId = item["appearing_detail_id"];
        const optionNum = optionIdList.indexOf(String(optionId));
        return { ...acc, [questionName]: optionNum };
      },
      {}
    );
    return newSelectedBefore;
  };

  useMemo(() => {
    setSelectedQuestions(Object.keys(removeNaNKeys(selectedOptionBefore)));
  }, [selectedOptionBefore]);

  const getPreviousValue = async () => {
    const ret = await new Promise((resolve) => {
      setGlobalModal({
        onClose: resolve,
        title: "直前のファイルの登場データ反映します。よろしいですか?",
        message: "既に登録されているデータは上書きされます。",
      });
    });
    setGlobalModal(undefined);
    if (ret === "ok") {
      try {
        const previousFileId = await getPreviousFileId(fileId);
        if (previousFileId === 404) {
          console.log("not found");
        } else {
          const appearlingList = await getAppearingWithFileId(
            previousFileId["file_id"]
          );
          // 直前の登場情報を DB に登録。
          appearlingList.forEach(async (elem: Appearing) => {
            // forEach の引数が async 関数なので forEach のループは引き数の関数の終了を待たずに回り続ける。
            // 引き数の async 関数内の await はその関数内で呼び出した非同期関数を待っている。
            const res = await addAppearing(
              fileId,
              elem["task_id"],
              elem["appearing_detail_id"]
            );
            // すでに登場データが登録されている場合は上書き。
            if (res === 422) {
              console.log("already exist.");
              await updateAppearing(
                fileId,
                elem["task_id"],
                elem["appearing_detail_id"]
              );
            }
          });

          // 新たに登録した登場情報をフォームの初期値に設定。
          const newSelectedOptionBefore = await appearingListToSelectedBefore(
            appearlingList
          );
          setSelectedOptionBefore(newSelectedOptionBefore);
        }
      } catch {
        console.error("エラーが発生しました。");
      }
    }
  };

  return (
    <>
      <G2WButton
        label="直前のファイルの登場データを反映"
        onclick={getPreviousValue}
        plusStyle="my-4"
      />
      <br></br>
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
      <hr></hr>
      <WisewordForm fileId={fileId} characters={selectedQuestions} />
    </>
  );
};

export default AppearingDetailForm;
