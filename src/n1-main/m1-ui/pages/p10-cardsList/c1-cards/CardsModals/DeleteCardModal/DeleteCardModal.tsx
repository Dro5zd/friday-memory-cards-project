import React from 'react';
import {ModalEdited} from "../Modal/ModalEdited";
import SuperButton from "../../../../../common/c2-SuperButton/SuperButton";

interface IDeleteCardModal {
    closeModal: () => void;
    modalMode: boolean;
}
export const DeleteCardModal:React.FC<IDeleteCardModal> = ({closeModal, modalMode}) => {
    return (
        <ModalEdited closeModal={closeModal} modalMode={modalMode}>
            <div>Are you sure?</div>
            <SuperButton title={'Cancel'} onClick={closeModal}/>
            <SuperButton title={'Delete'}/>
        </ModalEdited>
    );
};
