import { useState } from "react";
import Trans2GButton from "components/button/Trans2GButton";
import TextAreaWithButton from "components/form/TextAreaWithButton";

type StringToVoidFunction = (arg: string) => {} | void | Promise<void>;

type MultiTextAreaWithButtonProps = {
  addButtonLabel?: string;
  plusStyleAddButton?: string;
  plusStyleParent?: string;
  plusStyleTextArea?: string;
  placeholder?: string;
  defaultValue?: string;
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
    defaultValue = "",
    handleOnChangeAdditional = (x) => {},
    plusStyleButtonForTextArea = [""],
    buttonLabelForTextArea = ["削除"],
    handleClickAdditional = [(x) => {}],
  } = props;
  const [items, setItems] = useState<{ id: number; element: JSX.Element }[]>(
    []
  );
  const [serialNum, setSerialNum] = useState(0);

  const handleAddItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      {
        id: serialNum,
        element: (
          <TextAreaWithButton
            key={serialNum}
            buttonLabel={buttonLabelForTextArea}
            plusStyleParent={plusStyleParent}
            plusStyleTextArea={plusStyleTextArea}
            placeholder={placeholder}
            handleOnChangeAdditional={handleOnChangeAdditional}
            plusStyleButton={plusStyleButtonForTextArea}
            defaultValue={defaultValue}
            handleClick={[
              (inputText) => {
                handleDeleteItem(serialNum);
                handleClickAdditional[0](inputText);
              },
              ...handleClickAdditional.slice(1),
            ]}
          />
        ),
      },
    ]);
    setSerialNum((prevId) => prevId + 1);
  };

  const handleDeleteItem = (itemId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <>
      <Trans2GButton
        label={addButtonLabel}
        onclick={handleAddItem}
        plusStyle={`mt-4 mb-2 py-2 px-4 ${plusStyleAddButton}`}
      />
      <div className="flex justify-center flex-wrap">
        {items.map((item) => item.element)}
      </div>
    </>
  );
};

export default MultiTextAreaWithButton;
