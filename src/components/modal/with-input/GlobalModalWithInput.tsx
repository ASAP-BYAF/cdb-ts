import ModalWithInput from "./ModalWithInput";
import { useGlobalModalWithInputContext } from "./GlobalModalWithInputContext";

/**
 * 入力欄付きモーダル
 */

const GlobalModalWithInput = () => {
  const globalModalWithInputProps = useGlobalModalWithInputContext();

  return (
    <>
      {globalModalWithInputProps && (
        <ModalWithInput {...globalModalWithInputProps} />
      )}
    </>
  );
};

export default GlobalModalWithInput;
