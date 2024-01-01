import { useForm, Controller } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FormHelperText, FormControl } from "@mui/material";

const items = [
  {
    id: 0,
    name: "Object 0",
  },
  {
    id: 1,
    name: "Object 1",
  },
  {
    id: 2,
    name: "Object 2",
  },
  {
    id: 3,
    name: "Object 3",
  },
  {
    id: 4,
    name: "Object 4",
  },
];

const CharaBox = () => {
  const defaultIds = [1, 3];

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
    <form onSubmit={handleSubmit((data) => console.log("data", data.item_ids))}>
      <FormControl error={!!formState.errors.item_ids?.message}>
        <FormHelperText>{formState.errors.item_ids?.message}</FormHelperText>
        <Controller
          name="item_ids"
          render={({ field }) => (
            <>
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
            </>
          )}
          control={control}
        />
      </FormControl>
    </form>
  );
};

export default CharaBox;
