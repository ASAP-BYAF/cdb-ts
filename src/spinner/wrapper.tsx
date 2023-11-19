import GlobalSpinnerContextProvider from "spinner/GlobalSpinnerContext";

const SpinnerProviderWrapper = (props: { children: React.ReactElement }) => {
  const { children } = props;
  return (
    <GlobalSpinnerContextProvider>{children}</GlobalSpinnerContextProvider>
  );
};

export default SpinnerProviderWrapper;
