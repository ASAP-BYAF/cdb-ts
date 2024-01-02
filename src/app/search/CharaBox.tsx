import { useState, useEffect } from "react";
import { getTaskAll } from "api/task";
import { useGlobalSpinnerActionsContext } from "contexts/spinner/GlobalSpinnerContext";
import MyCheckBox from "./CheckBox";

type Chara = {
  id: number;
  title: string;
};

type Item = {
  id: number;
  name: string;
};

const CharaBox = (): JSX.Element => {
  const [charas, setCharas] = useState<Item[]>([]);
  const setGlobalSpinner = useGlobalSpinnerActionsContext();

  const renameTitleToName = (arr: Chara[]) => {
    return arr.map((obj: Chara) => ({
      ...obj,
      name: obj.title,
      title: undefined,
    }));
  };

  const getAllChara = async () => {
    try {
      setGlobalSpinner(true);
      const res = await getTaskAll();
      const res_ = renameTitleToName(res);
      setCharas(res_);
      return;
    } catch {
      console.error("error");
    } finally {
      setGlobalSpinner(false);
    }
  };

  useEffect(() => {
    getAllChara();
  }, []);

  return (
    <MyCheckBox
      items={charas}
      handleSubmitProvided={(ids) =>
        console.log(
          ids.forEach((id) => console.log(`id = ${id}, name = ${charas}`))
        )
      }
    />
  );
};

export default CharaBox;
