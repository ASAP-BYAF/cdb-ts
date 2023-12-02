import { useState, useMemo, useEffect } from "react";
import MyDialog from "app/register/myDialog";
import MyDialogRename from "app/register/myDialogRename";
import CharaForm from "./CharaForm";
import {
  addTask,
  deleteTaskById,
  getTaskAll,
  getTaskByTitle,
  updateTask,
} from "api/task";
import { concatObject } from "util/add";
import { deleteItemFromArray, deleteItemFromObject } from "util/delete";
import { renameItemInArray } from "util/rename";
import NumberDropdown from "components/dropdown/NumberDropdown";
import { arrayToObject } from "util/add";
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
import AppearingDetailForm from "./AppearingDetailForm";
import { useGlobalSpinnerActionsContext } from "components/spinner/GlobalSpinnerContext";

const RefineRadioBase = () => {
  const [questions, setQuestions] = useState([]);
  const [questionsDiff, setQuestionsDiff] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [optionInput, setOptionInput] = useState("");
  const [options, setOptions] = useState([]);
  const [optionSelectedDiff, setOptionSelectedDiff] = useState([]);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [fileExist, setFileExist] = useState(false);
  const [optionExist, setOptionExist] = useState(false);
  const [selectedOptionBefore, setSelectedOptionBefore] = useState(
    arrayToObject(questions, options[0])
  );
  const [modalConfig, setModalConfig] = useState(undefined);
  const [modalConfigRename, setModalConfigRename] = useState(undefined);
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
        updateQuestions(taskNameList, "added");
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

  const handleInputChange = (event) => {
    const newText = event.target.value.toLowerCase();
    setFilterText(newText);
    const filteredquestions = allQuestions.filter((item) =>
      item.toLowerCase().includes(newText)
    );
    // 配列の中身を比較。中身が異なるときだけ questions の状態を更新。
    // 単に questions !== filteredquestions とするだけではだめだった。
    if (JSON.stringify(questions) !== JSON.stringify(filteredquestions)) {
      setQuestions(filteredquestions);
    }
    // 選択肢の追加ボタンは検索に該当する選択肢がないときにだけ表示。
    if (filteredquestions.length === 0) {
      setVisibleAdd(true);
    } else {
      setVisibleAdd(false);
    }
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

  const handleAddOption = async (newOptionName) => {
    setGlobalSpinner(true);
    const res = await addAppearingDetail(newOptionName);
    const appearing_detail_id = res.id;
    setOptions((prev) =>
      concatObject(prev, { [appearing_detail_id]: newOptionName })
    );
    setGlobalSpinner(false);
  };

  const handleAddTask = async () => {
    setGlobalSpinner(true);
    updateQuestions([filterText], "added");
    //　task (人物) を DB にも追加する。
    await addTask(filterText);
    setVisibleAdd(false);
    setGlobalSpinner(false);
  };

  const toggleRenameModel = async (x) => {
    const ret = await new Promise((resolve) => {
      setModalConfigRename({
        onClose: resolve,
        title: "新しい選択肢を入力してください。",
        message: "空白のみにはできません。",
        oldText: x,
      });
    });
    setModalConfigRename(undefined);
    return ret;
  };

  const handleRenameOption = async (e) => {
    const x = e.target.name;
    const ret = await toggleRenameModel(x);
    const ret_trimed = ret.trim();
    if (ret !== "cancel" && ret_trimed) {
      setGlobalSpinner(true);
      const res = await getAppearingDetailByName(x);
      const appearing_detail_id = res.id;
      await updateAppearingDetail(appearing_detail_id, ret);
      setOptions((prev) => ({ ...prev, [appearing_detail_id]: ret }));
      setGlobalSpinner(false);
    }
  };

  const handleRenameTask = async (e) => {
    const x = e.target.name;
    const ret = await toggleRenameModel(x);
    const ret_trimed = ret.trim();
    if (ret !== "cancel" && ret_trimed && !allQuestions.includes(ret_trimed)) {
      setGlobalSpinner(true);
      updateQuestions([x, ret], "renamed");
      const res = await getTaskByTitle(x);
      await updateTask(res.id, ret);
      setGlobalSpinner(false);
    }
  };

  const toggleDeleteModel = async () => {
    const ret = await new Promise((resolve) => {
      setModalConfig({
        onClose: resolve,
        title: "削除します。よろしいですか?",
        message: "削除すると二度と元に戻せません。",
      });
    });
    setModalConfig(undefined);
    return ret;
  };

  const handleDeleteOption = async (e) => {
    const appearing_detail_name = e.target.name;
    const ret = await toggleDeleteModel();
    if (ret === "ok") {
      setGlobalSpinner(true);
      await deleteAppearingDetail(appearing_detail_name);
      const old_id = Object.keys(options).find(
        (key) => options[key] === appearing_detail_name
      );
      const newOptions = deleteItemFromObject(options, old_id);
      setOptions(newOptions);
      await getSelectedBefore(newOptions, fileId);
      setGlobalSpinner(false);
    }
  };

  const handleDeleteTask = async (e) => {
    const x = e.target.name;
    console.log(x);
    const ret = await toggleDeleteModel();
    if (ret === "ok") {
      setGlobalSpinner(true);
      updateQuestions([x], "deleted");
      const res = await getTaskByTitle(x);
      await deleteTaskById(res.id);
      setGlobalSpinner(false);
    }
  };

  // 質問の追加、削除、変更時に現在表示している質問とすべての質問を更新。
  // また、前回との差分を計算。
  const updateQuestions = (x, sign) => {
    // x は配列を想定。
    if (sign === "added") {
      // 最初の DB からとってくるときのみ x の長さは 1 とは限らない。
      // そのため、diff = x[0] ではだめ。
      const diff = x.filter((value) => {
        return !questions.includes(value);
      });
      setQuestions((prev) => [...prev, ...x]);
      setAllQuestions((prev) => [...prev, ...x]);
      setQuestionsDiff([sign, diff]);
    } else if (sign === "deleted") {
      // CharaFrom.tsx において questionsDiff の第二項は string[] 型なので配列で渡す。
      // questions, allQuestions は string[] 型なので
      // deleteItemFromArray に対して、削除したい値は string で与える。
      setQuestions((prev) => deleteItemFromArray(prev, x[0]));
      setAllQuestions((prev) => deleteItemFromArray(prev, x[0]));
      setQuestionsDiff([sign, x]);
    } else if (sign === "renamed") {
      const oldValue = x[0];
      const newValue = x[1];
      setQuestions((prev) => renameItemInArray(prev, oldValue, newValue));
      setAllQuestions((prev) => renameItemInArray(prev, oldValue, newValue));
      setQuestionsDiff([sign, [oldValue, newValue]]);
      return "renamed";
    }
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
      const taskIdNameObj = await allQuestions.reduce(async (acc, item) => {
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

  useMemo(async () => {
    // console.log("usememo3");
    setGlobalSpinner(true);
    if (Object.keys(optionSelectedDiff).length !== 0) {
      const task_id = await getTaskIdFromDb(optionSelectedDiff["name"]);
      if (optionSelectedDiff["value"]) {
        const selectedOptionNum =
          Object.values(options)[optionSelectedDiff["value"]];
        const new_appearing_detail_id = Object.keys(options).find(
          (key) => options[key] === selectedOptionNum
        );
        const res = await updateAppearing(
          fileId,
          task_id,
          new_appearing_detail_id
        );
        // 未選択の場合、更新する対象が見つからないので、新たに作成する。
        if (res === 404) {
          console.error(
            "未選択の場合、更新する対象が見つからないので、新たに作成する。"
          );
          await addAppearing(fileId, task_id, new_appearing_detail_id);
        }
      } else {
        await deleteAppearing(fileId, task_id);
      }
    }
    setGlobalSpinner(false);
  }, [optionSelectedDiff]);

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
      <div>
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
      </div>

      {/* 人物の登録、登場の登録・変更 */}
      <div style={{ display: fileExist && optionExist ? "block" : "none" }}>
        <input
          type="text"
          placeholder="人物を絞り込む"
          onChange={handleInputChange}
        />
        <button
          className="addQuestionButton"
          type="button"
          onClick={handleAddTask}
          style={{ display: visibleAdd ? "inline-block" : "none" }}
        >
          add
        </button>
        <CharaForm
          questions={questions}
          questionsDiff={questionsDiff}
          options={Object.keys(options).map((item, idx) => {
            return idx;
          })}
          handleDeleteClick={handleDeleteTask}
          handleRenameClick={handleRenameTask}
          provideOptionChange={setOptionSelectedDiff}
          selectedOptionsBefore={selectedOptionBefore}
        />
      </div>

      <hr></hr>

      {/* 登場の仕方の登録 */}
      <input
        type="text"
        placeholder="add options"
        onChange={(e) => {
          setOptionInput(e.target.value);
        }}
      />
      <button type="button" onClick={() => handleAddOption(optionInput)}>
        add
      </button>
      <AppearingDetailForm
        options={options}
        handleDeleteClick={handleDeleteOption}
        handleRenameClick={handleRenameOption}
      />

      {/* 削除・変更時のモーダル */}
      {modalConfig && <MyDialog {...modalConfig} />}
      {modalConfigRename && <MyDialogRename {...modalConfigRename} />}
    </BaseFrame>
  );
};

export default RefineRadioBase;