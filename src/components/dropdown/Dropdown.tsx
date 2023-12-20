type DropdownProps = {
  providedOptions: number[] | string[];
  label?: string;
  handleChange?: (arg: string) => void;
};

const Dropdown = (props: DropdownProps): JSX.Element => {
  const { providedOptions, label = "default", handleChange = () => {} } = props;
  const options: JSX.Element[] = [];
  providedOptions.forEach((item, index) => {
    options.push(
      <option key={item} value={item}>
        {item}
      </option>
    );
  });
  return (
    <span>
      <select
        id="Dropdown"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          handleChange(e.target.value)
        }
      >
        {options}
      </select>
      <label htmlFor="Dropdown"> {label} </label>
    </span>
  );
};

export default Dropdown;
