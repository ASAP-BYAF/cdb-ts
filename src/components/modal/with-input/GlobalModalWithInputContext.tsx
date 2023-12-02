import React, { useState, useContext, createContext } from "react";

type ModalWithInputProps = {
  onClose: (args: any) => void;
  title: string;
  message: string;
  oldText: string;
};

const GlobalModalWithInputContext = createContext<
  ModalWithInputProps | undefined
>(undefined);
const GlobalModalWithInputActionsContext = createContext<
  React.Dispatch<React.SetStateAction<ModalWithInputProps | undefined>>
  // eslint-disable-next-line @typescript-eslint/no-empty-function
>(() => {});

// 入力欄付きモーダルの表示・非表示
export const useGlobalModalWithInputContext = ():
  | ModalWithInputProps
  | undefined =>
  useContext<ModalWithInputProps | undefined>(GlobalModalWithInputContext);

// 入力欄付きモーダルの表示・非表示のアクション
export const useGlobalModalWithInputActionsContext = (): React.Dispatch<
  React.SetStateAction<ModalWithInputProps | undefined>
> =>
  useContext<
    React.Dispatch<React.SetStateAction<ModalWithInputProps | undefined>>
  >(GlobalModalWithInputActionsContext);

interface GlobalModalWithInputContextProviderProps {
  children?: React.ReactNode;
}

/**
 * 入力欄付きモーダルコンテキストプロバイダー
 */
const GlobalModalWithInputContextProvider = ({
  children,
}: GlobalModalWithInputContextProviderProps) => {
  const [globalModalWithInputProps, setGlobalModalWithInputProps] = useState<
    ModalWithInputProps | undefined
  >(undefined);

  return (
    <GlobalModalWithInputContext.Provider value={globalModalWithInputProps}>
      <GlobalModalWithInputActionsContext.Provider
        value={setGlobalModalWithInputProps}
      >
        {children}
      </GlobalModalWithInputActionsContext.Provider>
    </GlobalModalWithInputContext.Provider>
  );
};

export default GlobalModalWithInputContextProvider;
