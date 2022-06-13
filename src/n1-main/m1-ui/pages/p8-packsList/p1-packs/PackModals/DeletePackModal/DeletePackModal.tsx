import React from 'react';
import {useTypedDispatch} from "../../../../../../m2-bll/store";
import {ModalEdited} from "../../../../../common/c15-Modal/ModalEdited";
import SuperButton from "../../../../../common/c2-SuperButton/SuperButton";
import {deletePacksTC} from "../../../../../../m2-bll/cardPacksReducer";
import s from "../Modal.module.css";

interface IDeletePackModal {
  closeModal: () => void;
  modalMode: boolean;
  packId: string;
}

export const DeletePackModal: React.FC<IDeletePackModal> = ({
                                                              closeModal,
                                                              modalMode,
                                                              packId
                                                            }) => {

  const dispatch = useTypedDispatch()

  const deleteHandler = () => {
    closeModal()
    dispatch(deletePacksTC(packId))
  }

  return (
    <div>
      <ModalEdited closeModal={closeModal} modalMode={modalMode}>
        <span className={s.title}>Delete pack</span>
        <span className={s.subTitle}>Do you want to continue?</span>
        <span className={s.subTitle2}>All cards will be excluded from this course.</span>
        <div className={s.btnWrapper}>
          <SuperButton className={s.saveButton} title={'Delete'} onClick={deleteHandler}/>
          <SuperButton className={s.cancelButton} title={'Cancel'} onClick={closeModal}/>
        </div>
      </ModalEdited>
    </div>
  );
};