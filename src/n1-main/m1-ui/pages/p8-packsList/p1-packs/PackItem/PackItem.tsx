import React from 'react';
import s from './packItem.module.css';
import {useTypedDispatch, useTypedSelector} from '../../../../../m2-bll/store';
import {CardPackType, deletePacksTC, updatePacksTC} from '../../../../../m2-bll/cardPacksReducer';
import {UpdateCardsPackType} from '../../../../../m3-dal/cardPacks-api';
import trash from '../../../../../../assets/img/trashBlack.png'
import trashWhite from '../../../../../../assets/img/trashWhite.png'
import edit from '../../../../../../assets/img/slidersBlack.png'
import editWhite from '../../../../../../assets/img/slidersWhite.png'
import learn from '../../../../../../assets/img/bookOpenBlack.png'
import learnWhite from '../../../../../../assets/img/bookOpenWhite.png'
import moment from 'moment';
import {useNavigate} from "react-router-dom";
import {useModalHandler} from "../../../../../utils/use-modal-handler";
import {DeletePackModal} from "../PackModals/DeletePackModal/DeletePackModal";
import {EditPackModal} from "../PackModals/EditPackModal/EditPackModal";

export const PackItem: React.FC<PackItemType> = ({
                                                   pack,
                                                   userId,
                                                 }) => {
  const mode = useTypedSelector(state => state.ui.mode)
  const {modal: delete_modal, toggleModal: toggle_delete_modal} = useModalHandler()
  const {modal: edit_modal, toggleModal: toggle_edit_modal} = useModalHandler()
  const navigate = useNavigate()



  const openCardsListHandler = (packId: string) => {
    navigate('/cards-list/' + packId)
  }

  // const updateHandler = (data: UpdateCardsPackType) => {
  //   dispatch(updatePacksTC(data))
  // }

  return (
    <>
      <DeletePackModal
        closeModal={toggle_delete_modal}
        modalMode={delete_modal}
        packId={pack._id}
      />
      <EditPackModal
        closeModal={toggle_edit_modal}
        modalMode={edit_modal}
        packId={pack._id}
        initialPAckName={pack.name}
        />
      <tr className={s.packItemContainer}>
        <td onClick={() => openCardsListHandler(pack._id)} className={s.nameColumn}><span>{pack.name}</span>
        </td>
        <td className={s.cardsColumn}><span>{pack.cardsCount}</span></td>
        <td className={s.updateColumn}><span>{moment(pack.created).format('HH:mm MM.DD.YYYY')}</span></td>
        <td className={s.userNameColumn}>{pack.user_name}</td>
        <td className={s.actionsColumn}>
          <div className={s.buttonBlock}>
            <div className={s.learnWrapper}>
              <img className={s.packLearnIcon} src={mode ? learn : learnWhite} alt="learn"/>
            </div>
            {userId === pack.user_id &&
                <div className={s.editeWrapper}
                     onClick={toggle_edit_modal}>
                    <img className={s.packEditIcon} src={mode ? edit : editWhite} alt="edit"/>
                </div>
            }
            {userId === pack.user_id &&
                <div className={s.deleteWrapper} onClick={toggle_delete_modal}>
                    <img className={s.packDeleteIcon} src={mode ? trash : trashWhite} alt="delete"/>
                </div>
            }
          </div>
        </td>
      </tr>
    </>
  );
};

//type
interface PackItemType {
  pack: CardPackType
  userId: string
}


//() => updateHandler({cardsPack: {_id: pack._id, name: '🇺🇦🇺🇦🇺🇦🇺🇦'}})