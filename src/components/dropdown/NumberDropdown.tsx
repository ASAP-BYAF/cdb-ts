type NumberDropdownProps = {
  n_st: number;
  n_ed: number;
  label?: string;
  handleChange?: (arg: string) => void;
};

const NumberDropdown = (props: NumberDropdownProps): JSX.Element => {
  const { n_st, n_ed, label = "default", handleChange = () => {} } = props;
  const options = [];
  for (let i = n_st; i <= n_ed; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <span>
      <select
        id="numberDropdown"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          handleChange(e.target.value)
        }
      >
        {options}
      </select>
      <label htmlFor="numberDropdown"> {label} </label>
    </span>
  );
};

export default NumberDropdown;
