import React, {ReactNode} from 'react';
import s from './ModalHeaderEdited.module.css';

interface ModalType {
    children: ReactNode;
    modalMode: boolean;
    closeModal: () => void;
}

export const ModalHeaderEdited: React.FC<ModalType> = ({children, modalMode, closeModal}) => {
        return (
            <div className={modalMode ? `${s.modal} ${s.active}` : s.modal} onClick={closeModal}>
                <div className={ modalMode ? `${s.modalContent} ${s.active}` : s.modalContent} onClick={event => event.stopPropagation()}>
                    {children}
                </div>
            </div>
        );
    }
;
