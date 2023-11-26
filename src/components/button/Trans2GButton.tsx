import OnClickButton from "./OnClickButton";

type Trans2GButtonProps = {
  label: string;
  onclick: () => {} | void;
  plusStyle?: string;
};

const Trans2GButton = (props: Trans2GButtonProps) => {
  const { label, onclick, plusStyle = "" } = props;

  return (
    <OnClickButton
      label={label}
      onclick={onclick}
      baseStyle="rounded-md outline outline-emerald-500
      hover:bg-emerald-100"
      plusStyle={plusStyle}
    />
  );
};

export default Trans2GButton;
