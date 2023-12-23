import DuplicateChildren from "components/DuplicateChildren";
import SingleWisewordForm from "./SingleWisewordForm";

type WisewordFormProps = {
  fileId: number;
  characters: string[];
};

const WisewordForm = (props: WisewordFormProps): JSX.Element => {
  const { fileId, characters } = props;

  return (
    <>
      <div
        style={{
          display: fileId > 0 && characters.length > 0 ? "block" : "none",
        }}
      >
        <DuplicateChildren
          defaultElementList={["d"].map((item) => {
            return (
              <SingleWisewordForm
                characters={characters}
                defaultValueTextArea={item}
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
