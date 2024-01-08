import React, { useState, useContext, createContext } from "react";
import {
  Horizontal,
  Vertical,
  SnackbarProps,
} from "components/snackbar/MySnackbar";

const GlobalSnackbarContext = createContext<SnackbarProps>({
  open: false,
  vertical: "top" as Vertical,
  horizontal: "right" as Horizontal,
  message: "test",
});
const GlobalSnackbarActionsContext = createContext<
  React.Dispatch<React.SetStateAction<SnackbarProps>>
  // eslint-disable-next-line @typescript-eslint/no-empty-function
>(() => {});

// グローバルスナックバーの props
export const useGlobalSnackbarContext = (): SnackbarProps =>
  useContext<SnackbarProps>(GlobalSnackbarContext);

// グローバルスナックバーの props のアクション
export const useGlobalSnackbarActionsContext = (): React.Dispatch<
  React.SetStateAction<SnackbarProps>
> =>
  useContext<React.Dispatch<React.SetStateAction<SnackbarProps>>>(
    GlobalSnackbarActionsContext
  );

interface GlobalSnackbarContextProviderProps {
  children?: React.ReactNode;
}

/**
 * グローバルスナックバーコンテキストプロバイダー
 */
const GlobalSnackbarContextProvider = ({
  children,
}: GlobalSnackbarContextProviderProps) => {
  const [globalSnackbarProps, setGlobalSnackbarProps] = useState({
    open: false,
    vertical: "top" as Vertical,
    horizontal: "right" as Horizontal,
    message: "test",
  });

  return (
    <GlobalSnackbarContext.Provider value={globalSnackbarProps}>
      <GlobalSnackbarActionsContext.Provider value={setGlobalSnackbarProps}>
        {children}
      </GlobalSnackbarActionsContext.Provider>
    </GlobalSnackbarContext.Provider>
  );
};

export default GlobalSnackbarContextProvider;
