import React from 'react'
import s from './cardsList.module.css'
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';
import {CardItem} from './c1-cards/CardItem';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import {PackItem} from '../p8-packsList/p1-packs/PackItem';

export const CardsList = () => {

    return (
        <div className={s.container}>
            <div className={s.components}>
                <div className={s.packSide}>
                    <h4>PACKS LIST</h4>
                    <div className={s.searchContainer}>
                        <SuperInputText className={s.searchInput}/>
                        <SuperButton title={'ADD NEW PACK'} className={s.searchButton}/>
                    </div>
                    <div className={s.packsContainer}>
                        <div className={s.packListHeader}>
                            <div className={s.nameTitle}>Question</div>
                            <div className={s.nameTitle}>Answer</div>
                            <div className={s.updateTitle}>Last Updated</div>
                            <div className={s.actionsTitle}>Grade</div>
                        </div>
                        <CardItem/>
                    </div>
                    <div className={s.paginationContainer}>
                        123456789
                    </div>
                </div>
            </div>
        </div>
    )
}


