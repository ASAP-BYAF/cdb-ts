type G2WButtonProps = {
  label: string;
  onclick: () => {} | void;
  plusStyle?: string;
};

const G2WButton = (props: G2WButtonProps) => {
  const { label, onclick, plusStyle = "" } = props;

  return (
    <button
      onClick={onclick}
      className={`rounded-md outline outline-emerald-500 bg-emerald-500
            font-bold hover:bg-white ${plusStyle}`}
    >
      {label}
    </button>
  );
};

export default G2WButton;
