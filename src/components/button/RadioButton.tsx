type RadioButtonProps = {
  label: string;
  options: number[];
  selectedValue: number;
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
            className="w-6 h-6"
          />
        </label>
      ))}
    </span>
  );
};

export default RadioButton;
