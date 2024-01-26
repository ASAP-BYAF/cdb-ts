import { useForm, Controller } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FormHelperText, FormControl, Button } from "@mui/material";
import { amber, grey } from "@mui/material/colors";

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
      <FormControl
        error={!!formState.errors.item_ids?.message}
        className="w-[90%]"
      >
        <FormHelperText>{formState.errors.item_ids?.message}</FormHelperText>
        <Controller
          name="item_ids"
          render={({ field }) => (
            <div
              className="
            flex flex-wrap justify-center
            border-solid border-4 rounded-md border-gray-400
            bg-gray-400 bg-opacity-30 text-black
            "
            >
              {items.map((item) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => field.onChange(handleCheck(item.id))}
                      defaultChecked={defaultIds.includes(item.id)}
                      // color="secondary"
                      sx={{
                        color: grey[900],
                        "&.Mui-checked": {
                          color: grey[900],
                        },
                      }}
                    />
                  }
                  key={item.id}
                  label={item.name}
                  className="whitespace-nowrap"
                />
              ))}
            </div>
          )}
          control={control}
        />
      </FormControl>
      <div className="mt-4">
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{
            "background-color": amber[300],
            color: "black",
            ":hover": { background: amber[50] },
          }}
        >
          検索
        </Button>
      </div>
    </form>
  );
};

export default MyCheckBox;
