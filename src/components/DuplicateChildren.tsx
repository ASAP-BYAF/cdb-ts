import { useEffect, useState } from "react";
import Trans2GButton from "components/button/Trans2GButton";
import OnClickButton from "components/button/OnClickButton";

type ElementObj = { id: number; element: JSX.Element };

type MultiTextAreaWithButtonProps = {
  //
  // 複製する要素
  //
  children: JSX.Element;
  //
  // 要素リストの初期状態。
  //
  defaultElementList?: JSX.Element[];
  //
  // テキストエリア追加ボタンのラベル
  //
  labelForAddButton?: string;
  //
  // テキストエリア追加ボタンのラベル
  //
  labelForDeleteButton?: string;
  plusStyleAddButton?: string;
  plusStyleDeleteButton?: string;
  //
  // 要素削除時の追加処理
  //
  handleClickDeleteAdditional?: (
    e: React.MouseEvent<HTMLButtonElement>,
    arg: number
  ) => {} | void | Promise<void>;
};

const DuplicateChildren = (
  props: MultiTextAreaWithButtonProps
): JSX.Element => {
  const {
    children,
    defaultElementList = [],
    labelForAddButton = "追加",
    labelForDeleteButton = "削除",
    plusStyleAddButton,
    plusStyleDeleteButton,
    handleClickDeleteAdditional = () => {},
  } = props;
  const [items, setItems] = useState<ElementObj[]>([]);
  const [serialNum, setSerialNum] = useState(0);

  useEffect(() => {
    // (1) テキストエリア内の文字のデフォルト値が更新されたらテキストエリアの状態を初期化し、
    // (2) 新たにデフォルト値を設定したテキストエリアを作成。

    // デフォルト値が空のリストの場合 forEach が回らず初期化できなかったので場合分け
    if (defaultElementList.length === 0) {
      // (1)
      setSerialNum(0);
      setItems([]);
    } else {
      // (1)
      let serialNumber = 0;
      let textAreaList = [] as ElementObj[];
      // (2)
      defaultElementList.forEach((defaultElement) => {
        const res = handleAddItem(defaultElement, serialNumber, textAreaList);
        serialNumber = res[0];
        textAreaList = res[1];
      });
    }
  }, [defaultElementList]);

  const handleAddItem = (
    newElement: JSX.Element,
    serialNumber: number = serialNum,
    textAreaList: ElementObj[] = items
  ): [number, ElementObj[]] => {
    // forEach 内で繰り返し呼ぶときにのみ更新前の状態をあらわに与える。
    // これは forEach 内では状態の更新が反映されないため、forEach 内でだけ使われる 別の変数で
    // 状態の管理をしているからである。
    // 返り値を設定しているのも同様の理由からである。
    const newItems = [
      ...textAreaList,
      {
        id: serialNumber,
        element: (
          <div key={serialNumber}>
            {newElement}
            <OnClickButton
              onclick={(e) => handleDeleteItem(e, serialNumber)}
              label={labelForDeleteButton}
              plusStyle={plusStyleDeleteButton}
            />
          </div>
        ),
      },
    ];
    const newId = serialNumber + 1;

    // 状態を更新
    setItems(newItems);
    setSerialNum(newId);
    return [newId, newItems];
  };

  const handleDeleteItem = (
    e: React.MouseEvent<HTMLButtonElement>,
    itemId: number
  ) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    handleClickDeleteAdditional(e, itemId);
  };

  return (
    <>
      <Trans2GButton
        label={labelForAddButton}
        onclick={() => handleAddItem(children)}
        plusStyle={`mt-4 mb-2 py-2 px-4 ${plusStyleAddButton}`}
      />
      <div className="flex justify-center flex-wrap">
        {items.map((item) => item.element)}
      </div>
    </>
  );
};

export default DuplicateChildren;
