import React, { useState, useContext, createContext } from "react";
type ModalProps = {
  onClose: (args: any) => void;
  title: string;
  message: string;
};

const GlobalModalContext = createContext<ModalProps | undefined>(undefined);
const GlobalModalActionsContext = createContext<
  React.Dispatch<React.SetStateAction<ModalProps | undefined>>
  // eslint-disable-next-line @typescript-eslint/no-empty-function
>(() => {});

// グローバルモーダルの表示・非表示
export const useGlobalModalContext = (): ModalProps | undefined =>
  useContext<ModalProps | undefined>(GlobalModalContext);

// グローバルモーダルの表示・非表示のアクション
export const useGlobalModalActionsContext = (): React.Dispatch<
  React.SetStateAction<ModalProps | undefined>
> =>
  useContext<React.Dispatch<React.SetStateAction<ModalProps | undefined>>>(
    GlobalModalActionsContext
  );

interface GlobalModalContextProviderProps {
  children?: React.ReactNode;
}

/**
 * グローバルモーダルコンテキストプロバイダー
 */
const GlobalModalContextProvider = ({
  children,
}: GlobalModalContextProviderProps) => {
  const [globalModalProps, setGlobalModalProps] = useState<
    ModalProps | undefined
  >(undefined);

  return (
    <GlobalModalContext.Provider value={globalModalProps}>
      <GlobalModalActionsContext.Provider value={setGlobalModalProps}>
        {children}
      </GlobalModalActionsContext.Provider>
    </GlobalModalContext.Provider>
  );
};

export default GlobalModalContextProvider;
