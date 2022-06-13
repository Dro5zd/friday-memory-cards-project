import React from 'react';
import s from './packItem.module.css';
import {useTypedSelector} from '../../../../../m2-bll/store';
import {CardPackType} from '../../../../../m2-bll/cardPacksReducer';
import trash from '../../../../../../assets/img/trashBlack.png'
import trashWhite from '../../../../../../assets/img/trashWhite.png'
import edit from '../../../../../../assets/img/slidersBlack.png'
import editWhite from '../../../../../../assets/img/slidersWhite.png'
import learn from '../../../../../../assets/img/bookOpenBlack.png'
import learnWhite from '../../../../../../assets/img/bookOpenWhite.png'
import moment from 'moment';
import {useNavigate} from 'react-router-dom';
import {useModalHandler} from '../../../../../utils/use-modal-handler';
import {DeletePackModal} from '../PackModals/DeletePackModal/DeletePackModal';
import {EditPackModal} from '../PackModals/EditPackModal/EditPackModal';

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

    const LearningHandler = (packId: string) => {
        navigate('/learning-page/' + packId)
    }


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
                <td className={s.updateColumn}><span>{moment(pack.created).format('DD.MM.YYYY HH:mm')}</span></td>
                <td className={s.userNameColumn}>{pack.user_name}</td>
                <td className={s.actionsColumn}>
                    <div className={s.buttonBlock}>


                        {userId === pack.user_id ?
                            <div className={s.deleteWrapper} onClick={toggle_delete_modal}>
                                <img className={s.packDeleteIcon} src={mode ? trash : trashWhite} alt="delete"/>
                            </div> : <div className={s.empty}/>
                        }

                        {pack.cardsCount > 0 ? <div className={s.learnWrapper} onClick={() => LearningHandler(pack._id)}>
                            <img className={s.packLearnIcon} src={mode ? learn : learnWhite} alt="learn"/>
                        </div> : <div className={s.empty}/> }


                        {userId === pack.user_id ?
                            <div className={s.editeWrapper}
                                 onClick={toggle_edit_modal}>
                                <img className={s.packEditIcon} src={mode ? edit : editWhite} alt="edit"/>
                            </div> : <div className={s.empty}/>
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

// () => deleteHandler(pack._id)