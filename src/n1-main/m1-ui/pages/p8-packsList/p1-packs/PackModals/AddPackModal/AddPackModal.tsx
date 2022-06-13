import React, {ChangeEvent, useState} from 'react';
import SuperInputText from "../../../../../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../../../common/c2-SuperButton/SuperButton";
import s from "../Modal.module.css";
import {CreatePackDataType} from "../../../../../../m3-dal/cardPacks-api";
import {changePacksCurrentPageAC} from "../../../../../../m2-bll/appReducer";
import {postPacksTC} from "../../../../../../m2-bll/cardPacksReducer";
import {useTypedDispatch} from "../../../../../../m2-bll/store";
import {ModalEdited} from "../../../../../common/c15-Modal/ModalEdited";

interface IAddPackModal {
  closeModal: () => void;
  modalMode: boolean;
}

export const AddPackModal: React.FC<IAddPackModal> = ({
                                                        closeModal,
                                                        modalMode
                                                      }) => {
  const dispatch = useTypedDispatch();
  const [packName, setPackName] = useState('')

  const addPackHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPackName(e.currentTarget.value)
  }
  const createPackButtonHandler = (data: CreatePackDataType) => {
    closeModal()
    dispatch(changePacksCurrentPageAC(1))
    dispatch(postPacksTC(data))
  }

  return (
    <ModalEdited modalMode={modalMode} closeModal={closeModal}>
      <div className={s.wrapper}>
        <span className={s.title}>Create new pack</span>
        <SuperInputText
          placeholder='Pack Name...'
          onChange={addPackHandler}
          autoFocus
          className={s.packNameInput}
        />
        <div className={s.btnWrapper}>
          <SuperButton
            value={packName}
            onClick={() => {
              createPackButtonHandler({cardsPack: {name: packName}})
            }}
            title={'SAVE'}
            className={s.saveButton}
            disabled={packName === ''}
          />
          <SuperButton
            onClick={closeModal}
            title={'CANCEL'}
            className={s.cancelButton}
          />
        </div>
      </div>
    </ModalEdited>
  );
};