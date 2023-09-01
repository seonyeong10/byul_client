import ReactModal from "react-modal";
import { ReactNode } from "react";
import colors from "src/styles/Colors";

interface ModalType {
    isOpen: boolean,
    closeModal: () => void,
    children: ReactNode
}

const customStyle = {
    content: {
        width: '30vw',
        inset: '50% 50% auto 50%',
        height: 'auto',
        transform: 'translate(-50%, -50%)',
        border: `1px solid ${colors.blue.deep}`,
    }
};

const Modal = ({ isOpen, closeModal, children }: ModalType) => {
    return (
        <ReactModal
            isOpen={isOpen}
            style={customStyle}
            onRequestClose={closeModal}
        >
            {children}
        </ReactModal>
    );
};


export { Modal };