import React from 'react';
import {ModalEdited} from "../../../../../common/c14-Modal/ModalEdited";
import SuperButton from "../../../../../common/c2-SuperButton/SuperButton";
import {useTypedDispatch} from "../../../../../../m2-bll/store";
import {deleteCardTC} from "../../../../../../m2-bll/cardsReducer";
import s from "../../../../p8-packsList/p1-packs/PackModals/Modal.module.css";

interface IDeleteCardModal {
  closeModal: () => void;
  modalMode: boolean;
  cardId: string;
  packId: string;
}

export const DeleteCardModal: React.FC<IDeleteCardModal> = ({
                                                              closeModal,
                                                              modalMode,
                                                              cardId,
                                                              packId
                                                            }) => {
  const dispatch = useTypedDispatch()
  const onDeleteHandler = () => {
    closeModal()
    dispatch(deleteCardTC(cardId, packId))
  };
  return (
    <ModalEdited closeModal={closeModal} modalMode={modalMode}>
      <div className={s.deleteModuleWrapper}>
        <span className={s.title}>Delete card</span>
        <span className={s.subTitle}>Are you sure you want to delete this card?</span>
        <div className={s.btnWrapper}>
          <SuperButton className={s.saveButton} title={'Delete'} onClick={onDeleteHandler}/>
          <SuperButton className={s.cancelButton} title={'Cancel'} onClick={closeModal}/>
        </div>
      </div>
    </ModalEdited>
  );
};
