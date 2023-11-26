type RadioButtonProps = {
  label: string;
  options: string[];
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RadioButton = (props: RadioButtonProps): JSX.Element => {
  const { label, options, selectedValue, onChange } = props;

  return (
    <span>
      {label}:
      {options.map((option) => (
        <label key={option}>
          <input
            type="radio"
            name={label}
            value={option}
            checked={selectedValue === option}
            onChange={onChange}
          />
        </label>
      ))}
    </span>
  );
};

export default RadioButton;
