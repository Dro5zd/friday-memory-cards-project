import React from 'react';
import s from './packItem.module.css';
import {useTypedSelector} from '../../../../../m2-bll/store';
import {CardPackType} from '../../../../../m2-bll/cardPacksReducer';
import {UpdateCardsPackType} from '../../../../../m3-dal/cardPacks-api';
import trash from '../../../../../../assets/img/trashBlack.png'
import trashWhite from '../../../../../../assets/img/trashWhite.png'
import edit from '../../../../../../assets/img/slidersBlack.png'
import editWhite from '../../../../../../assets/img/slidersWhite.png'
import learn from '../../../../../../assets/img/bookOpenBlack.png'
import learnWhite from '../../../../../../assets/img/bookOpenWhite.png'
import moment from 'moment';

export const PackItem: React.FC<PackItemType> = ({
                                                   pack,
                                                   userId,
                                                   changeDeleteMode,
                                                   updateHandler,
                                                   openCardsListHandler
                                                 }) => {
  const mode = useTypedSelector(state => state.ui.mode)


  return (
    <tr className={s.packItemContainer}>
      <td onClick={() => openCardsListHandler(pack._id)} className={s.nameColumn}><span>{pack.name}</span>
      </td>
      <td className={s.cardsColumn}><span>{pack.cardsCount}</span></td>
      <td className={s.updateColumn}><span>{moment(pack.created).format('MM.DD.YYYY, HH:mm')}</span></td>
      <td className={s.userNameColumn}>{pack.user_name}</td>
      <td className={s.actionsColumn}>
        <div className={s.buttonBlock}>
          <div className={s.learnWrapper}>
            <img className={s.packLearnIcon} src={mode ? learn : learnWhite} alt="learn"/>
          </div>
          {userId === pack.user_id &&
              <div className={s.editeWrapper}
                   onClick={() => updateHandler({cardsPack: {_id: pack._id, name: '🇺🇦🇺🇦🇺🇦🇺🇦'}})}>
                  <img className={s.packEditIcon} src={mode ? edit : editWhite} alt="edit"/>
              </div>
          }
          {userId === pack.user_id &&
              <div className={s.deleteWrapper} onClick={changeDeleteMode}>
                  <img className={s.packDeleteIcon} src={mode ? trash : trashWhite} alt="delete"/>
              </div>
          }
        </div>
      </td>
    </tr>
  );
};

//type
interface PackItemType {
  deleteHandler: (id: string) => void
  updateHandler: (data: UpdateCardsPackType) => void
  openCardsListHandler: (packId: string) => void
  changeDeleteMode: () => void
  pack: CardPackType
  userId: string
}

// () => deleteHandler(pack._id)