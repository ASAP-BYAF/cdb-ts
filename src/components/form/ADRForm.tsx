import { useState, useMemo } from "react";
import Trans2GButton from "components/button/Trans2GButton";
import { useGlobalModalActionsContext } from "components/modal/normal/GlobalModalContext";
import { useGlobalModalWithInputActionsContext } from "components/modal/with-input/GlobalModalWithInputContext";
import { renameItemInArray } from "util/rename";
import { deleteItemFromArray } from "util/delete";

type ADRFormProps = {
  providedOptions?: string[];
  handleClickAddAdditional?: (arg?: string) => {} | void;
  handleClickDeleteAdditional?: (arg?: string) => {} | void;
  handleClickRenameAdditional?: (arg?: string, arg2?: string) => {} | void;
};

// 選択肢の追加、削除、名前の変更ができるフォームです。
// Additional の関数を渡すことでそれぞれの動作に処理を追加できます。
const ADRForm = (props: ADRFormProps): JSX.Element => {
  const {
    providedOptions = ["tmp", "tmp2"],
    handleClickAddAdditional = () => {},
    handleClickDeleteAdditional = () => {},
    handleClickRenameAdditional = () => {},
  } = props;

  const [optionInput, setOptionInput] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const setGlobalModal = useGlobalModalActionsContext();
  const setGlobalModalWithInput = useGlobalModalWithInputActionsContext();

  useMemo(() => {
    setOptions(providedOptions);
  }, [providedOptions]);

  const handleAddOption = async () => {
    setOptions((prev) => [...prev, optionInput]);
    handleClickAddAdditional(optionInput);
  };

  const handleClickRename = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const optionName = e.currentTarget.name;
    const newOptionName = await new Promise<string>((resolve) => {
      setGlobalModalWithInput({
        onClose: resolve,
        title: "新しい選択肢を入力してください。",
        message: "空白のみにはできません。",
        oldText: optionName,
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
        renameItemInArray(prev, optionName, newOptionName_trimed)
      );
      // ここに追加処理を記載
      handleClickRenameAdditional(optionName, newOptionName_trimed);
    }
    // if (ret !== "cancel" && ret_trimed) なども関数内に含めればよい。
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
      const newOptions = deleteItemFromArray(options, optionName);
      setOptions(newOptions);
      // ここに追加処理を記載
      handleClickDeleteAdditional(optionName);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="新しい選択肢名を入力"
        onChange={(e) => {
          setOptionInput(e.target.value);
        }}
      />
      <button type="button" onClick={handleAddOption}>
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