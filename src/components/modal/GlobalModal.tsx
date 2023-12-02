import Modal from "components/modal/Modal";
import { useGlobalModalContext } from "components/modal/GlobalModalContext";

/**
 * グローバルモーダル
 */

const GlobalModal = () => {
  const globalModalProps = useGlobalModalContext();

  return <>{globalModalProps && <Modal {...globalModalProps} />}</>;
};

export default GlobalModal;
