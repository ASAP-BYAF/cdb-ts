type ButtonProps = {
  name: string;
  handleClick: (arg: string) => {};
  icon: string;
};

const Button = (props: ButtonProps): JSX.Element => {
  const { name, handleClick, icon } = props;

  return (
    <button
      type="button"
      name={name}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        handleClick(e.currentTarget.name);
      }}
    >
      {icon}
    </button>
  );
};

export default Button;
