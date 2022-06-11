import React, {useEffect} from 'react'
import s from './packsList.module.css'
import {getCardPackTC} from '../../../m2-bll/cardPacksReducer';
import {useTypedDispatch, useTypedSelector} from '../../../m2-bll/store';
import {changePacksCurrentPageAC} from '../../../m2-bll/appReducer';
import {PacksContainer} from './p1-packs/PackContainer/PacksContainer';
import {PaginationNew} from '../../common/c11-Pagination/PaginationNew';
import {PackSettings} from "./p1-packs/PackSettings/PackSettings";
import {PackHeader} from "./p1-packs/PackHeader/PackHeader";
import ServerErrors from "../../common/c0-ErrorsBlock/ServerErrors";

export const PacksList = () => {
    const packs = useTypedSelector(state => state.packs)
    const sortUserId = useTypedSelector(state => state.sort.user_id)
    const packNameValue = useTypedSelector(state => state.sort.packName)
    const requestPackMinValue = useTypedSelector(state => state.sort.packMinValue)
    const requestPackMaxValue = useTypedSelector(state => state.sort.packMaxValue)
    const dispatch = useTypedDispatch()

    const serverErrors = useTypedSelector(state => state.app.errors)

    useEffect(() => {
        dispatch(getCardPackTC())
    }, [sortUserId, packNameValue, requestPackMinValue, requestPackMaxValue])

    const changeCurrentPackPage = (page: number) => {
        dispatch(changePacksCurrentPageAC(page))
        dispatch(getCardPackTC())
    }

    return (
        <div className={s.container}>
            <div className={s.components}>
                <PackHeader/>
                {serverErrors && <ServerErrors errors={serverErrors}/>}
                <div className={s.wrapper}>
                    <PackSettings minRangeValue={packs.minCardsCount} maxRangeValue={packs.maxCardsCount}
                                  maxCardsCount={requestPackMaxValue} minCardsCount={requestPackMinValue}/>
                    <PacksContainer/>
                </div>
                <PaginationNew
                    totalCount={packs.cardPacksTotalCount}
                    pageSize={packs.pageCount}
                    currentPage={packs.page}
                    onPageChange={changeCurrentPackPage}
                    siblingCount={3}
                />
            </div>
        </div>
    )
}