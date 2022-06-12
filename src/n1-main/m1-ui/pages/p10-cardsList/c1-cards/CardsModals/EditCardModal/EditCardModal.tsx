import React from 'react';
import SuperInputText from "../../../../../common/c1-SuperInputText/SuperInputText";
import {ModalEdited} from "../Modal/ModalEdited";
import SuperButton from "../../../../../common/c2-SuperButton/SuperButton";

interface IEditCardModal {
    closeModal: () => void;
    modalMode: boolean;
}
export const EditCardModal:React.FC<IEditCardModal> = ({closeModal, modalMode}) => {
    return (
        <ModalEdited closeModal={closeModal} modalMode={modalMode}>
            <SuperInputText/>
            <SuperInputText/>
            <SuperButton title={'Cancel'} onClick={closeModal}/>
            <SuperButton/>
        </ModalEdited>
    );
};
