import Trans2GButton from "components/button/Trans2GButton";

type AppearingDetailFormProps = {
  options: string[];
  handleDeleteClick: (args: React.MouseEvent<HTMLButtonElement>) => {} | void;
  handleRenameClick: (args: React.MouseEvent<HTMLButtonElement>) => {} | void;
};

// RefineRadion.js から必要な情報受け取って
// キャラクターの登場の仕方の選択肢の作成フォームの見た目を調整します。
// 実際の DB 上の処理は RefineRadio.js で行っています。
const AppearingDetailForm = (props: AppearingDetailFormProps): JSX.Element => {
  const {
    options,
    handleDeleteClick = () => {},
    handleRenameClick = () => {},
  } = props;

  return (
    <>
      {Object.values(options).map((item, idx) => (
        <div key={item} className="py-1">
          <span>
            {idx}: {item} /
          </span>
          <Trans2GButton
            label="✕"
            name={item}
            onclick={handleDeleteClick}
            plusStyle="mx-1 px-1 hover:text-emerald-500"
          />
          <Trans2GButton
            label="✑"
            name={item}
            onclick={handleRenameClick}
            plusStyle="mx-1 px-1 hover:text-emerald-500"
          />
        </div>
      ))}
    </>
  );
};

export default AppearingDetailForm;
