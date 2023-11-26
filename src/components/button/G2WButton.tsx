import OnClickButton from "./OnClickButton";

type G2WButtonProps = {
  label: string;
  onclick: () => {} | void;
  plusStyle?: string;
};

const G2WButton = (props: G2WButtonProps) => {
  const { label, onclick, plusStyle = "" } = props;

  return (
    <OnClickButton
      label={label}
      onclick={onclick}
      baseStyle="rounded-md outline outline-emerald-500 bg-emerald-500
          font-bold hover:bg-white"
      plusStyle={plusStyle}
    />
  );
};

export default G2WButton;
