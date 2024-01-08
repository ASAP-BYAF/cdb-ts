import MySnackbar from "components/snackbar/MySnackbar";
import { useGlobalSnackbarContext } from "contexts/snackbar/GlobalSnackbarContext";

/**
 * グローバルスピナー
 */
const GlobalSnackbar = () => {
  const globalSnackbarProps = useGlobalSnackbarContext();

  return <>{<MySnackbar {...globalSnackbarProps} />}</>;
};

export default GlobalSnackbar;
