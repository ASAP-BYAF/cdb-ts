import MySnackbar from "components/snackbar/MySnackbar";
import { useGlobalSnackbarContext } from "contexts/snackbar/GlobalSnackbarContext";

/**
 * グローバルスピナー
 */
const GlobalSnackbar = () => {
  const isGlobalSnackbarOn = useGlobalSnackbarContext();

  return <>{<MySnackbar open={isGlobalSnackbarOn} />}</>;
};

export default GlobalSnackbar;
