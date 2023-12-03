type OnClickButtonProps = {
  label: string;
  name?: string;
  onclick: (args: React.MouseEvent<HTMLButtonElement>) => {} | void;
  baseStyle?: string;
  plusStyle?: string;
};

const OnClickButton = (props: OnClickButtonProps) => {
  const { label, name = "", onclick, baseStyle = "", plusStyle = "" } = props;

  return (
    <button
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => onclick(e)}
      name={name}
      className={`${baseStyle} ${plusStyle}`}
    >
      {label}
    </button>
  );
};

export default OnClickButton;
