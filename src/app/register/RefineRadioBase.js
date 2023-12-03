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

const RefineRadioBase = () => {
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [fileExist, setFileExist] = useState(false);
  const [optionExist, setOptionExist] = useState(false);
  const [selectedOptionBefore, setSelectedOptionBefore] = useState(
    arrayToObject(questions, options[0])
  );
  const [vol, setVol] = useState(1);
  const [file, setFile] = useState(1);
  const [filename, setFileName] = useState("");
  const [fileId, setFileId] = useState();

  const setGlobalSpinner = useGlobalSpinnerActionsContext();

  // 認証ガード
  useAuthGuard("/signin");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTaskAll();
        const taskNameList = res.map((item) => item["title"]);
        setQuestions((prev) => [...prev, ...taskNameList]);
      } catch (error) {
        console.error(error);
      }
      try {
        const res = await getAppearingAll();
        const appearingIdNameObj = res.reduce((accumulator, x) => {
          return { ...accumulator, [x["id"]]: x["appearing_detail"] };
        }, {});
        setOptions(appearingIdNameObj);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTaskIdFromDb = async (title) => {
    const res = await getTaskByTitle(title);
    return res.id;
  };

  const handleVolNumChange = (x) => {
    setVol(x);
  };
  const handleFileNumChange = (x) => {
    setFile(x);
  };

  const confirmFileName = async () => {
    setGlobalSpinner(true);
    if (fileId < 0) {
      const res = await addFile(vol, file, filename);
      setFileId(res.id);
    } else {
      const res = await updateFile(fileId, vol, file, filename);
      setFileId(res.id);
    }
    setGlobalSpinner(false);
  };

  // 登場ステータスフォームに対する追加処理
  const handleAddOption = async (newOptionName) => {
    setGlobalSpinner(true);
    const res = await addAppearingDetail(newOptionName);
    setOptions((prev) => concatObject(prev, { [res.id]: newOptionName }));
    setGlobalSpinner(false);
  };

  const handleDeleteOption = async (oldOptionName) => {
    setGlobalSpinner(true);
    await deleteAppearingDetail(oldOptionName);
    const newOptions = deleteItemFromObjectbyValue(options, oldOptionName);
    setOptions(newOptions);
    await getSelectedBefore(newOptions, fileId);
    setGlobalSpinner(false);
  };

  const handleRenameOption = async (oldOptionName, newOptionName) => {
    setGlobalSpinner(true);
    const res = await getAppearingDetailByName(oldOptionName);
    await updateAppearingDetail(res.id, newOptionName);
    setOptions((prev) =>
      renameValueInObject(prev, oldOptionName, newOptionName)
    );
    setGlobalSpinner(false);
  };

  // 登録情報フォームに対する追加処理
  const handleAddQuestion = async (newQuestionName) => {
    setGlobalSpinner(true);
    //　task (人物) を DB にも追加する。
    await addTask(newQuestionName);
    setQuestions((prev) => [...prev, newQuestionName]);
    setGlobalSpinner(false);
  };

  const handleDeleteQuestion = async (questionName) => {
    setGlobalSpinner(true);
    const res = await getTaskByTitle(questionName);
    await deleteTaskById(res.id);
    setQuestions((prev) => deleteItemFromArray(prev, questionName));
    setGlobalSpinner(false);
  };

  const handleRenameQuestion = async (oldQuestionName, newQuestionName) => {
    setGlobalSpinner(true);
    const res = await getTaskByTitle(oldQuestionName);
    await updateTask(res.id, newQuestionName);
    setQuestions((prev) =>
      renameItemInArray(prev, oldQuestionName, newQuestionName)
    );
    setGlobalSpinner(false);
  };

  const handleInitQuestion = async (questionName) => {
    setGlobalSpinner(true);
    const questionId = await getTaskIdFromDb(questionName);
    await deleteAppearing(fileId, questionId);
    setGlobalSpinner(false);
  };

  const handleSelectedOptionChange = async (
    questionName,
    newSeletedOptionNum
  ) => {
    setGlobalSpinner(true);
    const questionId = await getTaskIdFromDb(questionName);
    const newSeletedOptionId = Object.keys(options)[newSeletedOptionNum];
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

  const getSelectedBefore = async (options, file_id) => {
    // 入力
    //    options = {
    //               appearingDetailId1: appearingDetailName1,
    //               appearingDetailId2: appearingDetailName2,
    //               ...
    //              }
    //
    //    file_id = integer
    //
    // 中で定義している変数の説明
    //     (1) appearingList = [
    //                      {taskId1: x1, fileId1: y1, appearingDetailId1: z1},
    //                      {taskId2: x2, fileId2: y2, appearingDetailId2: z2},
    //                      ...
    //                     ]
    //         現在選択されている file に対して登録されているすべての登場の仕方
    // 　　　　　を集めたもの。
    //
    //     (2) taskIdNameObj = {taskId1: taskName1, taskId2: taskName2, ...}
    //         task に関して id と name を対応付けたオブジェクト。
    //
    //     (3) appearingDetailIdList = [appearingDetailId1, appearingDetailId2, ...]
    //         option に含まれる id を順に並べたもの。id と選択肢の番号を対応付けることが目的。
    //
    //     (4) tmpSelectedBefore = {taskName1: optionNum1, taskName2: optionNum2, ....}
    //         task の名前と登場の仕方を結びつけている。登場の仕方は選択肢の番号に変換されている。
    //
    //     処理内容
    //         (1) の各要素について taskId を (2) を通して taskName に変換、
    //         appearingDetailId を (3) を通して optionNum に変換し、(4) を作成。
    //

    // console.log(`fileId = ${fileId}`);
    // console.log(`fileExist = ${fileExist}`);
    // console.log(`optionExist = ${optionExist}`);
    // console.log("options !!");
    // console.log(options);
    // console.log("================================");
    try {
      setGlobalSpinner(true);
      const appearlingList = await getAppearingWithFileId(file_id);
      const taskIdNameObj = await questions.reduce(async (acc, item) => {
        acc = await acc;
        const taskId = await getTaskIdFromDb(item);
        acc = { ...acc, [taskId]: item };
        return acc;
      }, {});
      const appearingDetailIdList = Object.keys(options);
      const tmpSelectedBefore = appearlingList.reduce((acc, item) => {
        const taskId = item["task_id"];
        const task = taskIdNameObj[taskId];
        const appearingDetailId = item["appearing_detail_id"];
        const optionNum = appearingDetailIdList.indexOf(
          String(appearingDetailId)
        );
        return { ...acc, [task]: optionNum };
      }, {});
      console.log(tmpSelectedBefore);
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
    // fileExist は一応入れているだけ。
    if (fileExist && optionExist) {
      await getSelectedBefore(options, fileId);
    }
  }, [fileId, fileExist, optionExist]);

  // 巻数あるいはファイル番号が変わるたびにこの関数を実行
  useMemo(async () => {
    // console.log("usememo4");
    const res = await getFileById(vol, file);
    if (res.message === "None") {
      setFileName("");
      setFileId(-1);
    } else {
      setFileName(res.file_name);
      setFileId(res.id);
    }
  }, [vol, file]);

  useMemo(() => {
    if (fileId > 0) {
      setFileExist(true);
    } else {
      setFileExist(false);
    }
  }, [fileId]);

  return (
    <BaseFrame>
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
        value={filename}
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
    </BaseFrame>
  );
};

export default RefineRadioBase;
