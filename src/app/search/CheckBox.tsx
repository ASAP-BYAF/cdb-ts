import { useForm, Controller } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FormHelperText, FormControl, Button } from "@mui/material";

type Item = {
  id: number;
  name: string;
};

type MyCheckBoxProps = {
  items: Item[];
  defaultIds?: number[];
  handleSubmitProvided?: (args: number[]) => {} | void | Promise<void>;
};

const MyCheckBox = (props: MyCheckBoxProps): JSX.Element => {
  const {
    items,
    defaultIds = [],
    handleSubmitProvided = (args) => {
      console.log(args);
    },
  } = props;

  const { control, handleSubmit, getValues, formState } = useForm({
    defaultValues: { item_ids: defaultIds },
  });

  const handleCheck = (checkedId: number) => {
    const { item_ids: ids } = getValues();
    const newIds = ids?.includes(checkedId)
      ? ids?.filter((id) => id !== checkedId)
      : [...(ids ?? []), checkedId];
    return newIds;
  };

  return (
    <form
      onSubmit={handleSubmit((data) => handleSubmitProvided(data.item_ids))}
    >
      <FormControl error={!!formState.errors.item_ids?.message}>
        <FormHelperText>{formState.errors.item_ids?.message}</FormHelperText>
        <Controller
          name="item_ids"
          render={({ field }) => (
            <div className="flex">
              {items.map((item) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => field.onChange(handleCheck(item.id))}
                      defaultChecked={defaultIds.includes(item.id)}
                    />
                  }
                  key={item.id}
                  label={item.name}
                />
              ))}
            </div>
          )}
          control={control}
        />
      </FormControl>
      <div>
        <Button type="submit" variant="contained" size="small" color="success">
          送信
        </Button>
      </div>
    </form>
  );
};

export default MyCheckBox;
