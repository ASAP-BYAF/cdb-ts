import Modal from "components/modal/normal/Modal";
import { useGlobalModalContext } from "components/modal/normal/GlobalModalContext";

/**
 * グローバルモーダル
 */

const GlobalModal = () => {
  const globalModalProps = useGlobalModalContext();

  return <>{globalModalProps && <Modal {...globalModalProps} />}</>;
};

export default GlobalModal;
