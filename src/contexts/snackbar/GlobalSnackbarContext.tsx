import React, { useState, useContext, createContext } from "react";

const GlobalSnackbarContext = createContext<boolean>(false);
const GlobalSnackbarActionsContext = createContext<
  React.Dispatch<React.SetStateAction<boolean>>
  // eslint-disable-next-line @typescript-eslint/no-empty-function
>(() => {});

// グローバルスピナーの表示・非表示
export const useGlobalSnackbarContext = (): boolean =>
  useContext<boolean>(GlobalSnackbarContext);

// グローバルスピナーの表示・非表示のアクション
export const useGlobalSnackbarActionsContext = (): React.Dispatch<
  React.SetStateAction<boolean>
> =>
  useContext<React.Dispatch<React.SetStateAction<boolean>>>(
    GlobalSnackbarActionsContext
  );

interface GlobalSnackbarContextProviderProps {
  children?: React.ReactNode;
}

/**
 * グローバルスピナーコンテキストプロバイダー
 */
const GlobalSnackbarContextProvider = ({
  children,
}: GlobalSnackbarContextProviderProps) => {
  const [isGlobalSnackbarOn, setGlobalSnackbar] = useState(false);

  return (
    <GlobalSnackbarContext.Provider value={isGlobalSnackbarOn}>
      <GlobalSnackbarActionsContext.Provider value={setGlobalSnackbar}>
        {children}
      </GlobalSnackbarActionsContext.Provider>
    </GlobalSnackbarContext.Provider>
  );
};

export default GlobalSnackbarContextProvider;
