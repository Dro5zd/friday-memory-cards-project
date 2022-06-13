import React, {useState} from 'react';
import {updatePacksTC} from "../../../../../../m2-bll/cardPacksReducer";
import {useTypedDispatch} from "../../../../../../m2-bll/store";
import {ModalEdited} from "../../../../../common/c14-Modal/ModalEdited";
import SuperInputText from "../../../../../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../../../common/c2-SuperButton/SuperButton";
import s from "../Modal.module.css";

interface IEditPackModal {
  closeModal: () => void;
  modalMode: boolean;
  packId: string
  initialPAckName: string
}

export const EditPackModal: React.FC<IEditPackModal> = ({
                                                          packId,
                                                          initialPAckName,
                                                          closeModal,
                                                          modalMode,
                                                        }) => {

  const dispatch = useTypedDispatch()
  const [packName, setPackName] = useState<string>(initialPAckName)

  const updateHandler = () => {
    closeModal()
    dispatch(updatePacksTC(packId, packName))
  }

  return (
    <div className={s.wrapper}>
      <ModalEdited modalMode={modalMode} closeModal={closeModal}>
        <span className={s.title}>Update Pack Name</span>
        <SuperInputText
          className={s.packNameInput}
          placeholder={'New Pack Name'}
          value={packName}
          onChange={(e) => {setPackName(e.currentTarget.value)}}
        />
       <div className={s.btnWrapper}>
         <SuperButton
           className={s.saveButton}
           title={'Update'}
           onClick={updateHandler}
           disabled={packName === ''}
         />
         <SuperButton
           className={s.cancelButton}
           title={'Cancel'}
           onClick={closeModal}
         />
       </div>
      </ModalEdited>
    </div>
  );
};