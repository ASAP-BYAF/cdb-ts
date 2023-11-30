import OnClickButton from "./OnClickButton";

type Trans2GButtonProps = {
  label: string;
  name?: string;
  onclick: (args: React.MouseEvent<HTMLButtonElement>) => {} | void;
  plusStyle?: string;
};

const Trans2GButton = (props: Trans2GButtonProps) => {
  const { label, name, onclick, plusStyle = "" } = props;

  return (
    <OnClickButton
      label={label}
      name={name}
      onclick={onclick}
      baseStyle="rounded-md outline outline-emerald-500
      hover:bg-emerald-100"
      plusStyle={plusStyle}
    />
  );
};

export default Trans2GButton;
