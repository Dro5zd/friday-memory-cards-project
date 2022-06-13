import React, {ReactNode} from 'react';
import s from './Modal.module.css';

interface ModalType {
  children: ReactNode
  modalMode: boolean
  changeModelMode: () => void
}

export const Modal: React.FC<ModalType> = ({changeModelMode,  modalMode, children}) => {

    return (
      <div className={modalMode? `${s.modal} ${s.active}` : s.modal} onClick={changeModelMode}>
        <div className={s.modalContent} onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
    );
  }
;
