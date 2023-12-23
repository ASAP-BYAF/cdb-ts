type DropdownProps = {
  providedOptions: number[] | string[];
  label?: string;
  defaultValue?: number | string;
  handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Dropdown = (props: DropdownProps): JSX.Element => {
  const {
    providedOptions,
    label = "default",
    defaultValue,
    handleChange = () => {},
  } = props;
  const options: JSX.Element[] = [<option value="" selected disabled></option>];
  providedOptions.forEach((item, index) => {
    if (item === defaultValue) {
      options.push(
        <option key={item} value={item} selected>
          {item}
        </option>
      );
    } else {
      options.push(
        <option key={item} value={item}>
          {item}
        </option>
      );
    }
  });
  return (
    <span>
      <select
        id="Dropdown"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange(e)}
      >
        {options}
      </select>
      <label htmlFor="Dropdown"> {label} </label>
    </span>
  );
};

export default Dropdown;
