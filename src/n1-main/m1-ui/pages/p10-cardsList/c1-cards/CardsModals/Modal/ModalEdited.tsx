import React, {ReactNode} from 'react';
import s from './Modal.module.css';

interface ModalType {
    children: ReactNode;
    modalMode: boolean;
    closeModal: () => void;
}

export const ModalEdited: React.FC<ModalType> = ({children, modalMode, closeModal}) => {
        return (
            <div className={modalMode ? `${s.modal} ${s.active}` : s.modal} onClick={closeModal}>
                <div className={s.modalContent} onClick={event => event.stopPropagation()}>
                    {children}
                </div>
            </div>
        );
    }
;
