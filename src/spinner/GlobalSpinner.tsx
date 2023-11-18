import Spinner from "spinner/Spinner";
import { useGlobalSpinnerContext } from "spinner/GlobalSpinnerContext";

/**
 * グローバルスピナー
 */
const GlobalSpinner = () => {
  const isGlobalSpinnerOn = useGlobalSpinnerContext();

  return <>{isGlobalSpinnerOn && <Spinner />}</>;
};

export default GlobalSpinner;
