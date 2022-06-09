import React from 'react';
import s from './packsContainer.module.css'
import {PackItem} from '../PackItem/PackItem';
import {setUpdatedFilterAC} from '../../../../../m2-bll/sortReducer';
import {getCardPackTC} from '../../../../../m2-bll/cardPacksReducer';
import {useTypedDispatch, useTypedSelector} from '../../../../../m2-bll/store';

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
            <table>
                <thead>
                <tr className={s.packListHeader}>
                    <th className={s.nameTitle} onClick={() => sortUpdatedHandler('name')}>Name</th>
                    <th className={s.cardsTitle} onClick={() => sortUpdatedHandler('cardsCount')}>Cards
                    </th>
                    <th className={s.updateTitle} onClick={() => sortUpdatedHandler('updated')}
                    >Last Updated
                    </th>
                    <th className={s.creatorTitle}
                        onClick={() => sortUpdatedHandler('user_name')}>Created by
                    </th>
                    <th className={s.actionsTitle}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {pack.cardPacks.map(p =>
                    <PackItem userId={userId} pack={p} key={p._id}/>)}
                </tbody>
            </table>
        </div>
    );
};