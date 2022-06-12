import React from 'react';
import s from './Modal.module.css'

interface ModalType {
  enableBackground?: boolean;
  backgroundOnClick?: () => void;
  modalOnClick?: () => void;
  show: boolean
  children: any

}

export const ModalAddPack: React.FC<ModalType> = ({
                                                    modalOnClick,
                                                    backgroundOnClick,
                                                    enableBackground,
                                                    show,
                                                    children,

                                                  }) => {

  if (!show) return null;
  return (
    <>
      {
        enableBackground &&
          <div className={s.background}
               onClick={backgroundOnClick}>
          </div>
      }
      <div className={s.components}
           onClick={modalOnClick}
      >{children}
      </div>
    </>
  );
};