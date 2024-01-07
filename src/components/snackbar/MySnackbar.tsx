import { Snackbar } from "@mui/material";
import { useGlobalSnackbarActionsContext } from "contexts/snackbar/GlobalSnackbarContext";

type MySnackbarProps = {
  open: boolean;
};

const MySnackbar = (props: MySnackbarProps) => {
  const { open } = props;
  const setGlobalSnackbar = useGlobalSnackbarActionsContext();

  const handleClose = () => {
    setGlobalSnackbar(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      onClose={handleClose}
      message="I love snacks"
    />
  );
};

export default MySnackbar;
