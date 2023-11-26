type OnClickButtonProps = {
  label: string;
  name?: string;
  onclick: (args: undefined | React.MouseEvent<HTMLButtonElement>) => {} | void;
  baseStyle?: string;
  plusStyle?: string;
};

const OnClickButton = (props: OnClickButtonProps) => {
  const { label, name = "", onclick, baseStyle = "", plusStyle = "" } = props;

  return (
    <button
      onClick={onclick}
      name={name}
      className={`${baseStyle} ${plusStyle}`}
    >
      {label}
    </button>
  );
};

export default OnClickButton;
