import DuplicateChildren from "components/DuplicateChildren";
import SingleWisewordForm from "./SingleWisewordForm";
import { useEffect, useState } from "react";
import { getWisewordByFileid } from "api/wiseword";

type WisewordFormProps = {
  fileId: number;
  characters: string[];
};

const WisewordForm = (props: WisewordFormProps): JSX.Element => {
  const { fileId, characters } = props;

  const [registeredWiseword, setRegisteredWiseword] = useState<string[]>([]);
  const [registeredSpeakers, setRegisteredSpeakers] = useState<string[]>([]);

  const getRegisteredWiseword = async () => {
    try {
      const res = await getWisewordByFileid(fileId);
      const registeredSpeakers = res.map((item) => {
        return item["title"];
      });
      const registeredWisewords = res.map((item) => {
        return item["phrase"];
      });
      setRegisteredSpeakers(registeredSpeakers);
      setRegisteredWiseword(registeredWisewords);
      return;
    } catch {
      console.error("error");
    }
  };

  useEffect(() => {
    getRegisteredWiseword();
  }, [fileId]);

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
              />
            );
          })}
          handleClickDeleteAdditional={(x, y) => {
            console.log(x);
            console.log(y);
          }}
        >
          <SingleWisewordForm characters={characters} fileId={fileId} />
        </DuplicateChildren>
      </div>
    </>
  );
};

export default WisewordForm;
