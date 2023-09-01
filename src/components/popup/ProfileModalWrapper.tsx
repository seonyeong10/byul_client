import Modal from "react-modal";
import { ReactNode } from "react";

interface ModalType {
    isOpen: boolean,
    closeModal: () => void,
    children: ReactNode
}

const customStyle = {
    content: {
        width: 'auto',
        inset: '65px 5vw auto auto',
        height: 'auto',
    }
};

const MyModal = ({ isOpen, closeModal, children }: ModalType) => {
    return (
        <Modal
            isOpen={isOpen}
            style={customStyle}
            onRequestClose={closeModal}
            id="myModal"
        >
            {children}
        </Modal>
    );
};


export { MyModal };