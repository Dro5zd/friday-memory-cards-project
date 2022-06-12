import React, {ReactNode} from 'react';
import s from './Modal.module.css';
import {useTypedDispatch, useTypedSelector} from '../../../m2-bll/store';
import {changeModalModeAC} from '../../../m2-bll/uiReducer';

interface ModalType {
    children: ReactNode
}

export const Modal: React.FC<ModalType>  = ({children}) => {
    const dispatch = useTypedDispatch()
    const modelMode = useTypedSelector(state => state.ui.modalMode)

    const changeModelMode= () => {
        dispatch(changeModalModeAC(!modelMode))
    }

        return (
                <div className={modelMode ? `${s.modal} ${s.active}` : s.modal} onClick={changeModelMode}>
                    <div className={s.modalContent} onClick={event => event.stopPropagation()}>
                        {children}
                    </div>
                </div>
        );
    }
;
