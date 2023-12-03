import Modal from "components/modal/normal/Modal";
import { useGlobalModalContext } from "contexts/modal/normal/GlobalModalContext";

/**
 * グローバルモーダル
 */

const GlobalModal = () => {
  const globalModalProps = useGlobalModalContext();

  return <>{globalModalProps && <Modal {...globalModalProps} />}</>;
};

export default GlobalModal;
