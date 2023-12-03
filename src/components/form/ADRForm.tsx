import { useState, useEffect } from "react";
import Trans2GButton from "components/button/Trans2GButton";
import { useGlobalModalActionsContext } from "contexts/modal/normal/GlobalModalContext";
import { useGlobalModalWithInputActionsContext } from "contexts/modal/with-input/GlobalModalWithInputContext";
import { renameItemInArray } from "util/rename";
import { deleteItemFromArray } from "util/delete";

type ADRFormProps = {
  providedOptions: string[];
  handleClickAddAdditional?: (arg: string) => {} | void | Promise<void>;
  handleClickDeleteAdditional?: (arg: string) => {} | void | Promise<void>;
  handleClickRenameAdditional?: (
    arg: string,
    arg2: string
  ) => {} | void | Promise<void>;
};

// 選択肢の追加、削除、名前の変更ができるフォームです。
// Additional の関数を渡すことでそれぞれの動作に処理を追加できます。
// ADR は Add, Delete, Rename の頭文字をとっています。
const ADRForm = (props: ADRFormProps): JSX.Element => {
  const {
    providedOptions,
    handleClickAddAdditional = () => {},
    handleClickDeleteAdditional = () => {},
    handleClickRenameAdditional = () => {},
  } = props;

  const [optionInput, setOptionInput] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const setGlobalModal = useGlobalModalActionsContext();
  const setGlobalModalWithInput = useGlobalModalWithInputActionsContext();

  useEffect(() => {
    setOptions(providedOptions);
  }, [providedOptions]);

  const handleClickAdd = async () => {
    setOptions((prev) => [...prev, optionInput]);
    setOptionInput("");
    handleClickAddAdditional(optionInput);
  };

  const handleClickRename = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const oldOptionName = e.currentTarget.name;
    const newOptionName = await new Promise<string>((resolve) => {
      setGlobalModalWithInput({
        onClose: resolve,
        title: "新しい選択肢を入力してください。",
        message: "空白のみにはできません。",
        oldText: oldOptionName,
      });
    });
    setGlobalModalWithInput(undefined);
    const newOptionName_trimed = newOptionName.trim();
    if (
      newOptionName !== "cancel" &&
      newOptionName_trimed &&
      !options.includes(newOptionName_trimed)
    ) {
      setOptions((prev) =>
        renameItemInArray(prev, oldOptionName, newOptionName_trimed)
      );
      // ここに追加処理を記載
      handleClickRenameAdditional(oldOptionName, newOptionName_trimed);
    }
  };

  const handleClickDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const optionName = e.currentTarget.name;
    const ret = await new Promise((resolve) => {
      setGlobalModal({
        onClose: resolve,
        title: "削除します。よろしいですか?",
        message: "削除すると二度と元に戻せません。",
      });
    });
    setGlobalModal(undefined);
    if (ret === "ok") {
      setOptions((prev) => deleteItemFromArray(prev, optionName));
      // ここに追加処理を記載
      handleClickDeleteAdditional(optionName);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="新しい選択肢名を入力"
        value={optionInput}
        onChange={(e) => {
          setOptionInput(e.target.value);
        }}
      />
      <button type="button" onClick={handleClickAdd}>
        選択肢を追加
      </button>

      {options.map((item, idx) => (
        <div key={item} className="py-1">
          <span>
            {idx}: {item} /
          </span>
          <Trans2GButton
            label="✕"
            name={item}
            onclick={handleClickDelete}
            plusStyle="mx-1 px-1 hover:text-emerald-500"
          />
          <Trans2GButton
            label="✑"
            name={item}
            onclick={handleClickRename}
            plusStyle="mx-1 px-1 hover:text-emerald-500"
          />
        </div>
      ))}
    </>
  );
};

export default ADRForm;
