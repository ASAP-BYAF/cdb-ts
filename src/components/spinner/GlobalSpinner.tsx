import Spinner from "components/spinner/Spinner";
import { useGlobalSpinnerContext } from "components/spinner/GlobalSpinnerContext";

/**
 * グローバルスピナー
 */
const GlobalSpinner = () => {
  const isGlobalSpinnerOn = useGlobalSpinnerContext();

  return <>{isGlobalSpinnerOn && <Spinner />}</>;
};

export default GlobalSpinner;
