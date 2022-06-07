import React, {ChangeEvent, useState} from 'react'
import s from './packsList.module.css'
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import {SuperDoubleRange} from '../../common/c9-SuperDoubleRange/SuperDoubleRange';
import {PackItem} from './p1-packs/PackItem';
import {getCardPackTC, postPacksTC} from '../../../m2-bll/cardPacksReducer';
import {useTypedDispatch, useTypedSelector} from '../../../m2-bll/store';
import {CreatePackDataType} from '../../../m3-dal/cardPacks-api';
import {Pagination} from '../../common/c11-Pagination/Pagination';
import {getUserPacksTC, setMyAllFilterAC, setUpdatedFilterAC} from '../../../m2-bll/sortReducer';
import {changePacksCurrentPageAC} from '../../../m2-bll/appReducer';

export const PacksList = () => {
    const pack = useTypedSelector(state => state.packs)
    const userId = useTypedSelector(state => state.auth._id)
    const sortPacks = useTypedSelector(state => state.sort.sortPacks)
    const dispatch = useTypedDispatch()
    const [value1, setValue1] = useState(pack.minCardsCount)
    const [value2, setValue2] = useState(pack.maxCardsCount)
    const [packName, setPackName] = useState('')


    // const onChangeInputRangeHandle = (num: number) => {
    //     if (num >= value2) return
    //     setValue1(num)
    // }

    const onChangeDoubleInputRangeHandle = (nums: Array<number>) => {
        setValue1(nums[0])
        setValue2(nums[1])
    }
    const onchangeAddPackNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPackName(e.currentTarget.value)
    }
    const createPackButtonHandler = (data: CreatePackDataType) => {
        dispatch(postPacksTC(data))
    }
    const showMyPacksHandler = () => {
        dispatch(setMyAllFilterAC(userId))
        dispatch(getUserPacksTC())
    }
    const showAllPacksHandler = () => {
        dispatch(setMyAllFilterAC(''))
        dispatch(getCardPackTC())
    }
    const sortUpdatedHandler = () => {
        sortPacks === '0updated' ?
            dispatch(setUpdatedFilterAC('1updated')) :
            dispatch(setUpdatedFilterAC('0updated'))
        dispatch(getUserPacksTC())
    }

    const changeCurrentPackPage = (page: number) => {
        dispatch(changePacksCurrentPageAC(page))
        dispatch(getCardPackTC())
    }

    return (
        <div className={s.container}>
            <div className={s.components}>
                <h2 className={s.packListTitle}>PACKS LIST</h2>
                <div className={s.wrapper}>
                    <div className={s.leftSide}>
                        <div className={s.buttonsWrapper}>
                            <div className={s.buttonsGroupSpan}>
                                <span>Show packs Cards</span>
                            </div>
                            <div className={s.buttonsGroup}>
                                <SuperButton
                                    onClick={() => showMyPacksHandler()}
                                    title={'MY'}
                                    className={s.myBtn}
                                />
                                <SuperButton
                                    onClick={showAllPacksHandler}
                                    title={'ALL'}
                                    className={s.allBtn}
                                />
                            </div>
                        </div>
                        <div className={s.rangeWrapper}>
                            <div className={s.rangeSpan}>
                                <span>Number of Cards</span>
                            </div>
                            <div className={s.valueContainer}>
                                <span>{`${value1} - ${value2}`}</span>
                            </div>
                            <div className={s.range}>
                                <SuperDoubleRange
                                    onChangeRange={onChangeDoubleInputRangeHandle}
                                    value={[value1, value2]}
                                    setValue1={setValue1}
                                    setValue2={setValue2}
                                    min={pack.minCardsCount}
                                    max={pack.maxCardsCount}
                                />
                            </div>
                        </div>

                    </div>
                    <div className={s.packsSide}>
                        <div className={s.searchContainer}>
                            <SuperInputText
                                onChange={onchangeAddPackNameHandler}
                                className={s.searchInput}
                            />
                            <SuperButton
                                value={packName}
                                onClick={() => createPackButtonHandler({cardsPack: {name: packName}})}
                                title={'ADD NEW PACK'}
                                className={s.searchButton}
                                disabled={packName === ''}
                            />
                        </div>

                        <div className={s.packsContainer}>
                            <div className={s.packListHeader}>
                                <div className={s.nameTitle}>Name</div>
                                <div className={s.cardsTitle}>Cards</div>
                                <div onClick={() => sortUpdatedHandler()}
                                     className={s.updateTitle}>Last Updated
                                </div>
                                <div className={s.userNameColumn}>Created by</div>
                                <div className={s.actionsTitle}>Actions</div>
                            </div>
                            <PackItem/>
                        </div>

                    </div>
                </div>
                <div className={s.paginationContainer}>
                    <Pagination
                        totalItemsCount={pack.cardPacksTotalCount}
                        pageSize={pack.pageCount}
                        currentPage={pack.page}
                        onPageChanged={changeCurrentPackPage}
                    />
                </div>
            </div>
        </div>
    )
}