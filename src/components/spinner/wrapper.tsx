import GlobalSpinnerContextProvider from "components/spinner/GlobalSpinnerContext";

const SpinnerProviderWrapper = (props: { children: React.ReactElement }) => {
  const { children } = props;
  return (
    <GlobalSpinnerContextProvider>{children}</GlobalSpinnerContextProvider>
  );
};

export default SpinnerProviderWrapper;
