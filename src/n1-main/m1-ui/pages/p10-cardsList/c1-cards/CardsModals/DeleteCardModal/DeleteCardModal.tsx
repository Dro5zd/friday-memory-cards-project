import React from 'react';
import {ModalEdited} from "../Modal/ModalEdited";
import SuperButton from "../../../../../common/c2-SuperButton/SuperButton";
import {useTypedDispatch} from "../../../../../../m2-bll/store";
import {deleteCardTC} from "../../../../../../m2-bll/cardsReducer";

interface IDeleteCardModal {
    closeModal: () => void;
    modalMode: boolean;
    cardId: string;
    packId: string;
}
export const DeleteCardModal:React.FC<IDeleteCardModal> = ({closeModal, modalMode, cardId, packId}) => {
    const dispatch = useTypedDispatch()
    const onDeleteHandler = () => {
        closeModal()
        dispatch(deleteCardTC(cardId, packId))
    };
    return (
        <ModalEdited closeModal={closeModal} modalMode={modalMode}>
            <div>Are you sure?</div>
            <SuperButton title={'Cancel'} onClick={closeModal}/>
            <SuperButton title={'Delete'} onClick={onDeleteHandler}/>
        </ModalEdited>
    );
};
