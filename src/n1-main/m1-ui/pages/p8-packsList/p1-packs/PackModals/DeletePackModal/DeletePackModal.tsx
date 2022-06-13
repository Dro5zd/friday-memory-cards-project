import React from 'react';
import {useTypedDispatch} from "../../../../../../m2-bll/store";
import {ModalEdited} from "../../../../../common/c14-Modal/ModalEdited";
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

      <ModalEdited closeModal={closeModal} modalMode={modalMode}>
        <div className={s.wrapper}>
        <span className={s.title}>Delete pack</span>
        <span className={s.subTitle}>Are you sure you want to delete this pack?</span>
        <span className={s.subTitle2}>All cards will be excluded from this course.</span>
        <div className={s.btnWrapper}>
          <SuperButton className={s.saveButton} title={'Delete'} onClick={deleteHandler}/>
          <SuperButton className={s.cancelButton} title={'Cancel'} onClick={closeModal}/>
        </div>
        </div>
      </ModalEdited>

  );
};