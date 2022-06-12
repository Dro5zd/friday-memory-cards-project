import React from 'react';
import {ModalEdited} from "../Modal/ModalEdited";
import SuperInputText from "../../../../../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../../../common/c2-SuperButton/SuperButton";

interface IAddCardModal {
    closeModal: () => void;
    modalMode: boolean;
}
export const AddCardModal:React.FC<IAddCardModal> = ({closeModal, modalMode}) => {
    return (
        <ModalEdited closeModal={closeModal} modalMode={modalMode}>
            <SuperInputText/>
            <SuperInputText/>
            <SuperButton title={'Cancel'} onClick={closeModal}/>
            <SuperButton/>
        </ModalEdited>
    );
};
