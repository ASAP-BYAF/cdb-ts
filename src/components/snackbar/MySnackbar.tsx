import { Snackbar } from "@mui/material";
import { useGlobalSnackbarActionsContext } from "contexts/snackbar/GlobalSnackbarContext";

export type Horizontal = "center" | "left" | "right";
export type Vertical = "bottom" | "top";
export type SnackbarProps = {
  open: boolean;
  vertical: Vertical;
  horizontal: Horizontal;
  message: string;
};

const MySnackbar = (props: SnackbarProps) => {
  const { open, vertical, horizontal, message } = props;
  const setGlobalSnackbar = useGlobalSnackbarActionsContext();

  const handleClose = () => {
    setGlobalSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
      open={open}
      onClose={handleClose}
      message={message}
    />
  );
};

export default MySnackbar;
