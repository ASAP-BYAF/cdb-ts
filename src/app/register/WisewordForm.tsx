import DuplicateChildren from "components/DuplicateChildren";
import SingleWisewordForm from "./SingleWisewordForm";
import { useEffect, useState } from "react";
import { deleteWisewordById, getWisewordByFileId } from "api/wiseword";

type WisewordFormProps = {
  fileId: number;
  characters: string[];
};

const WisewordForm = (props: WisewordFormProps): JSX.Element => {
  const { fileId, characters } = props;

  const [registeredWiseword, setRegisteredWiseword] = useState<string[]>([]);
  const [registeredWisewordIds, setRegisteredWisewordIds] = useState<number[]>(
    []
  );
  const [registeredSpeakers, setRegisteredSpeakers] = useState<string[]>([]);

  const getRegisteredWiseword = async () => {
    try {
      const res = await getWisewordByFileId(fileId);
      const registeredSpeakers = res.map((item) => {
        return item["title"];
      });
      const registeredWisewords = res.map((item) => {
        return item["phrase"];
      });
      const registeredWisewordIds = res.map((item) => {
        return item["id"];
      });
      setRegisteredSpeakers(registeredSpeakers);
      setRegisteredWiseword(registeredWisewords);
      setRegisteredWisewordIds(registeredWisewordIds);
      return;
    } catch {
      console.error("error");
    }
  };

  useEffect(() => {
    getRegisteredWiseword();
  }, [fileId]);

  const deleteWisewordOnDB = async (id: number) => {
    if (id < 0) {
      // SingleWiseword.tsx で DB に登録されていない名言を囲む div には id = -1 を当ててている。
      return;
    } else {
      await deleteWisewordById(id);
      return;
    }
  };

  return (
    <>
      <div
        style={{
          display: fileId > 0 && characters.length > 0 ? "block" : "none",
        }}
      >
        <DuplicateChildren
          defaultElementList={registeredSpeakers.map((item, idx) => {
            return (
              <SingleWisewordForm
                characters={characters}
                defaultValueTextArea={registeredWiseword[idx]}
                defaultValueDropdown={item}
                fileId={fileId}
                registeredWisewordId={registeredWisewordIds[idx]}
              />
            );
          })}
          handleClickDeleteAdditional={(e, serialNum) => {
            const elem = e.currentTarget.parentNode
              ?.firstChild as HTMLDivElement;
            deleteWisewordOnDB(Number(elem.id));
          }}
          labelForAddButton="名言を追加"
        >
          <SingleWisewordForm characters={characters} fileId={fileId} />
        </DuplicateChildren>
      </div>
    </>
  );
};

export default WisewordForm;
