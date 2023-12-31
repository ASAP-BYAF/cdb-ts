import Dropdown from "./Dropdown";

type NumberDropdownProps = {
  n_st: number;
  n_ed: number;
  label?: string;
  defaultValue?: number;
  handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const NumberDropdown = (props: NumberDropdownProps): JSX.Element => {
  const {
    n_st,
    n_ed,
    label = "default",
    defaultValue,
    handleChange = () => {},
  } = props;
  const serial_num_list = [];
  for (let i = n_st; i <= n_ed; i++) {
    serial_num_list.push(i);
  }

  return (
    <Dropdown
      providedOptions={serial_num_list}
      label={label}
      defaultValue={defaultValue}
      handleChange={handleChange}
    />
  );
};

export default NumberDropdown;
