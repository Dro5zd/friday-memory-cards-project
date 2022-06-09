import React from 'react';
import s from './packsContainer.module.css'
import {PackItem} from '../../pages/p8-packsList/p1-packs/PackItem';
import {setUpdatedFilterAC} from '../../../m2-bll/sortReducer';
import {getCardPackTC} from '../../../m2-bll/cardPacksReducer';
import {useTypedDispatch, useTypedSelector} from '../../../m2-bll/store';

export const PacksContainer = () => {
    const pack = useTypedSelector(state => state.packs)
    const sortPacks = useTypedSelector(state => state.sort.sortPacks)
    const userId = useTypedSelector(state => state.auth._id)
    const dispatch = useTypedDispatch()

    const sortUpdatedHandler = (value: string) => {
        sortPacks === `0${value}` ?
            dispatch(setUpdatedFilterAC(`1${value}`)) :
            dispatch(setUpdatedFilterAC(`0${value}`))
        dispatch(getCardPackTC())
    }

    return (
        <div className={s.packsContainer}>
            <div className={s.packListHeader}>
                <div className={s.nameTitle} onClick={() => sortUpdatedHandler('name')}>Name</div>
                <div className={s.cardsTitle} onClick={() => sortUpdatedHandler('cardsCount')}>Cards
                </div>
                <div className={s.updateTitle} onClick={() => sortUpdatedHandler('updated')}
                     >Last Updated
                </div>
                <div className={s.creatorTitle}
                     onClick={() => sortUpdatedHandler('user_name')}>Created by
                </div>
                <div className={s.actionsTitle}>Actions</div>
            </div>
            <div className={s.packItem}>
                {
                    pack.cardPacks.map(p => <PackItem userId={userId} pack={p} key={p._id}/>)
                }
            </div>

        </div>
    );
};