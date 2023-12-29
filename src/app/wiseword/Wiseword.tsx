import GlobalSpinnerContextProvider from "contexts/spinner/GlobalSpinnerContext";
import WisewordBase from "./WisewordBase";

const Wiseword = () => {
  return (
    <GlobalSpinnerContextProvider>
      <WisewordBase />
    </GlobalSpinnerContextProvider>
  );
};

export default Wiseword;
