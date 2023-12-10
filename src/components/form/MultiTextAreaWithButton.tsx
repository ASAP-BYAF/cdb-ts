import { useEffect, useState } from "react";
import Trans2GButton from "components/button/Trans2GButton";
import TextAreaWithButton from "components/form/TextAreaWithButton";

type StringToVoidFunction = (arg: string) => {} | void | Promise<void>;

type MultiTextAreaWithButtonProps = {
  addButtonLabel?: string;
  plusStyleAddButton?: string;
  plusStyleParent?: string;
  plusStyleTextArea?: string;
  placeholder?: string;
  defaultValueList?: string[];
  handleOnChangeAdditional?: StringToVoidFunction;
  plusStyleButtonForTextArea?: string[];
  buttonLabelForTextArea?: string[];
  handleClickAdditional?: StringToVoidFunction[];
};

const MultiTextAreaWithButton = (
  props: MultiTextAreaWithButtonProps
): JSX.Element => {
  const {
    addButtonLabel = "入力欄を追加",
    plusStyleAddButton = "",
    plusStyleParent = "",
    plusStyleTextArea = "",
    placeholder = "ここに入力してください。",
    defaultValueList = [],
    handleOnChangeAdditional = (x) => {},
    plusStyleButtonForTextArea = [""],
    buttonLabelForTextArea = ["削除"],
    handleClickAdditional = [(x) => {}],
  } = props;
  const [items, setItems] = useState<{ id: number; element: JSX.Element }[]>(
    []
  );
  const [serialNum, setSerialNum] = useState(0);

  useEffect(() => {
    // デフォルト値が更新されたらテキストエリアの状態を初期化
    let serialNumber = 0;
    let textAreaList = [] as { id: number; element: JSX.Element }[];

    defaultValueList.forEach((defaultValue) => {
      const res = handleAddItem(defaultValue, serialNumber, textAreaList);
      serialNumber = res[0];
      textAreaList = res[1];
    });
  }, [defaultValueList]);

  const handleAddItem = (
    defaultValue: string = "",
    serialNumber: number = serialNum,
    textAreaList: { id: number; element: JSX.Element }[] = items
  ): [number, { id: number; element: JSX.Element }[]] => {
    // forEach 内で繰り返し呼ぶときにのみ更新前の状態をあらわに与えます。
    // これは forEach 内では状態の更新が反映されないため、別の変数で
    // 状態の管理をしているからです。
    const newItems = [
      ...textAreaList,
      {
        id: serialNumber,
        element: (
          <TextAreaWithButton
            key={serialNumber}
            buttonLabel={buttonLabelForTextArea}
            plusStyleParent={plusStyleParent}
            plusStyleTextArea={plusStyleTextArea}
            placeholder={placeholder}
            handleOnChangeAdditional={handleOnChangeAdditional}
            plusStyleButton={plusStyleButtonForTextArea}
            defaultValue={defaultValue}
            handleClick={[
              (inputText) => {
                handleDeleteItem(serialNumber);
                handleClickAdditional[0](inputText);
              },
              ...handleClickAdditional.slice(1),
            ]}
          />
        ),
      },
    ];
    const newId = serialNumber + 1;

    // 状態を更新
    setItems(newItems);
    setSerialNum(newId);
    return [newId, newItems];
  };

  const handleDeleteItem = (itemId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <>
      <Trans2GButton
        label={addButtonLabel}
        onclick={() => handleAddItem()}
        plusStyle={`mt-4 mb-2 py-2 px-4 ${plusStyleAddButton}`}
      />
      <div className="flex justify-center flex-wrap">
        {items.map((item) => item.element)}
      </div>
    </>
  );
};

export default MultiTextAreaWithButton;
