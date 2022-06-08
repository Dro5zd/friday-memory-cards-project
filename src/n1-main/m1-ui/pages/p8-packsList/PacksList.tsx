import React, {ChangeEvent, useEffect, useState} from 'react'
import s from './packsList.module.css'
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import {SuperDoubleRange} from '../../common/c9-SuperDoubleRange/SuperDoubleRange';
import {PackItem} from './p1-packs/PackItem';
import {getCardPackTC, postPacksTC} from '../../../m2-bll/cardPacksReducer';
import {useTypedDispatch, useTypedSelector} from '../../../m2-bll/store';
import {CreatePackDataType} from '../../../m3-dal/cardPacks-api';
import {Pagination} from '../../common/c11-Pagination/Pagination';
import {
    setMyAllFilterAC, setPackNameValue,
    setRangeValueAC,
    setUpdatedFilterAC
} from '../../../m2-bll/sortReducer';
import {changePacksCurrentPageAC} from '../../../m2-bll/appReducer';
import {DebounceSearch} from '../../common/c13-DebounceSearch/DebounceSearch';

export const PacksList = () => {
    const pack = useTypedSelector(state => state.packs)
    const userId = useTypedSelector(state => state.auth._id)
    const sortPacks = useTypedSelector(state => state.sort.sortPacks)
    const sortUserId = useTypedSelector(state => state.sort.user_id)
    const packNameValue = useTypedSelector(state => state.sort.packName)
    const dispatch = useTypedDispatch()
    const [value1, setValue1] = useState(pack.minCardsCount)
    const [value2, setValue2] = useState(pack.maxCardsCount)
    const [packName, setPackName] = useState('')

    useEffect(() => {
        setValue1(pack.minCardsCount)
        setValue2(pack.maxCardsCount)
        dispatch(getCardPackTC())
    }, [pack.minCardsCount, pack.maxCardsCount, sortUserId, packNameValue])

    const onChangeDoubleInputRangeHandle = (nums: Array<number>) => {
        setValue1(nums[0])
        setValue2(nums[1])
    }
    // const onchangeAddPackNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setPackName(e.currentTarget.value)
    // }
    const createPackButtonHandler = (data: CreatePackDataType) => {
        dispatch(changePacksCurrentPageAC(1))
        dispatch(postPacksTC(data))
    }
    const showMyPacksHandler = () => {
        dispatch(setMyAllFilterAC(userId))
        dispatch(setRangeValueAC(0, value2))
    }
    const showAllPacksHandler = () => {
        dispatch(setMyAllFilterAC(''))
    }
    const sortUpdatedHandler = (value: string) => {
        sortPacks === `0${value}` ?
            dispatch(setUpdatedFilterAC(`1${value}`)) :
            dispatch(setUpdatedFilterAC(`0${value}`))
        dispatch(getCardPackTC())
    }

    const changeCurrentPackPage = (page: number) => {
        dispatch(changePacksCurrentPageAC(page))
        dispatch(getCardPackTC())
    }

    const onMouseUpSetFilter = () => {
        dispatch(setRangeValueAC(value1, value2))
        dispatch(getCardPackTC())
    }

    const debounceHandler = (text: string) => {
        dispatch(setPackNameValue(text))
        setPackName(text)
        // urlCardsPackId && dispatch(getCardsTC(urlCardsPackId))
    };

    return (
        <div className={s.container}>
            <div className={s.components}>
                <div className={s.header}>
                    <h2 className={s.packListTitle}>PACKS LIST</h2>
                    <div className={s.searchContainer}>
                        <DebounceSearch className={s.searchInput} delay={1000} callback={debounceHandler}/>
                        <SuperButton
                            value={packName}
                            onClick={() => createPackButtonHandler({cardsPack: {name: packName}})}
                            title={'ADD NEW PACK'}
                            className={s.searchButton}
                            disabled={packName === ''}
                        />
                    </div>
                </div>

                <div className={s.wrapper}>
                    <div className={s.leftSide}>
                        <div className={s.buttonsWrapper}>
                            <div className={s.buttonsGroupSpan}>
                                <span>Show packs Cards</span>
                            </div>
                            {/*<div className={s.buttonsGroup}>*/}
                            {/*    <SuperButton*/}
                            {/*        onClick={() => showMyPacksHandler()}*/}
                            {/*        title={'MY'}*/}
                            {/*        className={s.myBtn}*/}
                            {/*    />*/}
                            {/*    <SuperButton*/}
                            {/*        onClick={showAllPacksHandler}*/}
                            {/*        title={'ALL'}*/}
                            {/*        className={s.allBtn}*/}
                            {/*    />*/}
                            {/*</div>*/}

                            {/*<div className={s.segmentedControl}>*/}
                            {/*    <label className={s.containerR}>My*/}
                            {/*        <input type="radio" checked name="radio"/>*/}
                            {/*            <span className={s.checkmark}></span>*/}
                            {/*    </label>*/}
                            {/*    <label className={s.containerR}>All*/}
                            {/*        <input type="radio" name="radio"/>*/}
                            {/*            <span className={s.checkmark}></span>*/}
                            {/*    </label>*/}
                            {/*    <div className={s.segmentedControlColor}></div>*/}
                            {/*</div>*/}

                            <div className={s.segmentedControl}>

                                <label htmlFor="tab-2" className={s.segmentedControl2} onClick={showAllPacksHandler}>
                                    <input type="radio" name="radio2" value="4" id="tab-2" checked/>
                                    <p>All</p></label>


                                <label htmlFor="tab-1" className={s.segmentedControl1}  onClick={() => showMyPacksHandler()}>
                                    <input type="radio" name="radio2" value="3" id="tab-1" />
                                    <p>My</p>
                                </label>
                                <div className={s.segmentedControlColor}></div>
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
                                    onMouseUpSetFilter={onMouseUpSetFilter}
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


                        <div className={s.packsContainer}>
                            <div className={s.packListHeader}>
                                <div className={s.nameTitle} onClick={() => sortUpdatedHandler('name')}>Name</div>
                                <div className={s.cardsTitle} onClick={() => sortUpdatedHandler('cardsCount')}>Cards
                                </div>
                                <div onClick={() => sortUpdatedHandler('updated')}
                                     className={s.updateTitle}>Last Updated
                                </div>
                                <div className={s.userNameColumn}
                                     onClick={() => sortUpdatedHandler('user_name')}>Created by
                                </div>
                                <div className={s.actionsTitle}>Actions</div>
                            </div>
                            <div className={s.packItem}>
                                <PackItem/>
                            </div>

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