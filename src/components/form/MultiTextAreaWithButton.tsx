import { useEffect, useState } from "react";
import Trans2GButton from "components/button/Trans2GButton";
import TextAreaWithButton from "components/form/TextAreaWithButton";

type StringToVoidFunction = (arg: string) => {} | void | Promise<void>;
type StringAndNumberToVoidFunction = (
  arg: string,
  textAreaId: number
) => {} | void | Promise<void>;

type MultiTextAreaWithButtonProps = {
  //
  // テキストエリア追加ボタンのラベル
  //
  labelForAddButton?: string;
  //
  // テキストエリアに付属したクリック時の処理機能を持つボタンのラベル
  //
  labelForTextAreaButton?: string[];
  //
  // テキストエリアの文字の初期値のリスト。
  //
  defaultValueList?: string[];
  handleOnChangeAdditional?: StringToVoidFunction;
  //
  // 親要素がテキストエリアに区別をつけるために用いる ID。
  //
  textAreaId?: number[];
  //
  // textAreaId を引数にとる。
  // 親要素は ID に応じて処理を実行できる。
  //
  handleClickAdditional?: StringAndNumberToVoidFunction[];
  //
  // 各要素への装飾の追加
  //
  plusStyleAddButton?: string;
  plusStyleParent?: string;
  plusStyleTextArea?: string;
  plusStyleTextAreaButton?: string[];
  //
  // テキストエリアのプレースホルダー
  //
  placeholder?: string;
};

const MultiTextAreaWithButton = (
  props: MultiTextAreaWithButtonProps
): JSX.Element => {
  const {
    labelForAddButton = "入力欄を追加",
    plusStyleAddButton = "",
    plusStyleParent = "",
    plusStyleTextArea = "",
    placeholder = "ここに入力してください。",
    defaultValueList = [],
    handleOnChangeAdditional = (x) => {},
    plusStyleTextAreaButton = [""],
    labelForTextAreaButton = ["削除"],
    handleClickAdditional = [(x) => {}],
    textAreaId = [1],
  } = props;
  const [items, setItems] = useState<{ id: number; element: JSX.Element }[]>(
    []
  );
  const [serialNum, setSerialNum] = useState(0);

  useEffect(() => {
    // (1) テキストエリア内の文字のデフォルト値が更新されたらテキストエリアの状態を初期化し、
    // (2) 新たにデフォルト値を設定したテキストエリアを作成。

    // (1)
    let serialNumber = 0;
    let textAreaList = [] as { id: number; element: JSX.Element }[];

    // (2)
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
    // forEach 内で繰り返し呼ぶときにのみ更新前の状態をあらわに与える。
    // これは forEach 内では状態の更新が反映されないため、forEach 内でだけ使われる 別の変数で
    // 状態の管理をしているからである。
    const newItems = [
      ...textAreaList,
      {
        id: serialNumber,
        element: (
          <TextAreaWithButton
            key={serialNumber}
            buttonLabel={labelForTextAreaButton}
            plusStyleParent={plusStyleParent}
            plusStyleTextArea={plusStyleTextArea}
            placeholder={placeholder}
            handleOnChangeAdditional={handleOnChangeAdditional}
            plusStyleButton={plusStyleTextAreaButton}
            defaultValue={defaultValue}
            handleClick={handleClickAdditional.map((handleClick, index) => {
              // １つ目のボタンにはデフォルトでそのテキストエリアを削除する機能をつける。
              // （textAreaId が指定されていないときに -1 を与える理由）
              // 親要素側で id 使うときに親自身が与えたものか新たに作成されたものかを区別しやすいように
              // id として使われづらい負の数を用いた。
              if (index === 0) {
                return (inputText) => {
                  handleDeleteItem(serialNumber);
                  handleClick(inputText, textAreaId[serialNumber] ?? -1);
                };
              } else {
                return (inputText) => {
                  handleClick(inputText, textAreaId[serialNumber] ?? -1);
                };
              }
            })}
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
        label={labelForAddButton}
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
