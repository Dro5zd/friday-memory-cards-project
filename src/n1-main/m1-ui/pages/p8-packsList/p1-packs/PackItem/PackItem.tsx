import React from 'react';
import s from './packItem.module.css';
import {CardPackType} from '../../../../../m2-bll/cardPacksReducer';
import trash from '../../../../../../assets/img/trash.svg'
import edit from '../../../../../../assets/img/sliders.svg'
import learn from '../../../../../../assets/img/bookOpen.svg'
import moment from 'moment';
import {NavLink, useNavigate} from 'react-router-dom';
import {PATH} from '../../../../routes/Routs';

interface PackItemType {
    pack: CardPackType
    userId: string
    openEditModalHandler: (id: string) => void
    openDeleteModalHandler: (id: string) => void
}

export const PackItem: React.FC<PackItemType> = ({
                                                     pack,
                                                     userId,
                                                     openEditModalHandler,
                                                     openDeleteModalHandler
                                                 }) => {

    const navigate = useNavigate()
    const openEditModal = () => openEditModalHandler(pack._id)
    const openDeleteModal = () => openDeleteModalHandler(pack._id)

    const openCardsListHandler = (packId: string) => {
        navigate('/cards-list/' + packId)
    }

    const LearningHandler = (packId: string) => {
        navigate('/learning-page/' + packId)
    }

    return (
            <tr className={s.packItemContainer}>
                <td onClick={() => openCardsListHandler(pack._id)} className={s.nameColumn}><span>{pack.name}</span>
                </td>
                <td className={s.cardsColumn}><span>{pack.cardsCount}</span></td>
                <td className={s.updateColumn}><span>{moment(pack.created).format('DD.MM.YYYY HH:mm')}</span></td>
                <td className={s.userNameColumn}>
                    <NavLink to={PATH.PROFILE} className={navData => navData.isActive ? s.active : s.link}>
                    {pack.user_name}
                    </NavLink>
                </td>
                <td className={s.actionsColumn}>
                    <div className={s.buttonBlock}>

                        {userId === pack.user_id ?
                            <div className={s.deleteWrapper} onClick={openDeleteModal}>
                                <img className={s.packDeleteIcon} src={trash} alt="delete"/>
                            </div> : <div className={s.empty}/>
                        }
                        {pack.cardsCount > 0 ? <div className={s.learnWrapper} onClick={() => LearningHandler(pack._id)}>
                            <img className={s.packLearnIcon} src={learn} alt="learn"/>
                        </div> : <div className={s.empty}/> }

                        {userId === pack.user_id ?
                            <div className={s.editeWrapper}
                                 onClick={openEditModal}>
                                <img className={s.packEditIcon} src={edit} alt="edit"/>
                            </div> : <div className={s.empty}/>
                        }
                    </div>
                </td>
            </tr>
    );
};