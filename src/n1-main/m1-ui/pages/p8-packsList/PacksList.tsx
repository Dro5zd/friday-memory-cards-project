import React, {ChangeEvent, useState} from 'react'
import s from './packsList.module.css'
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import {SuperDoubleRange} from '../../common/c9-SuperDoubleRange/SuperDoubleRange';
import {PackItem} from "./p1-packs/PackItem";
import {getCardPackTC, InitStateType, postPacksTC} from "../../../m2-bll/cardPacksReducer";
import {useTypedDispatch, useTypedSelector} from "../../../m2-bll/store";
import {CreatePackDataType} from "../../../m3-dal/cardPacks-api";


export const PacksList = () => {
  const pack = useTypedSelector(state => state.packs)
  const dispatch = useTypedDispatch()
  const initValue = {} as InitStateType
  const [value1, setValue1] = useState(pack.minCardsCount)
  const [value2, setValue2] = useState(pack.maxCardsCount)
  const [inputValue, setInputValue] = useState(pack.cardPacks[0].name)

  // const onChangeInputRangeHandle = (num: number) => {
  //     if (num >= value2) return
  //     setValue1(num)
  // }

  const onChangeDoubleInputRangeHandle = (nums: Array<number>) => {
    setValue1(nums[0])
    setValue2(nums[1])
  }

  const createPackHandler = (data: CreatePackDataType) => {
    dispatch(postPacksTC(data))
  }

  const addPackNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
    setInputValue('')
  }

  const showMyPacksHAndler = () => {

  }

  const showAllPacksHAndler = () => {

  }

  const sortUpdatedHandler = () => {
    dispatch(getCardPackTC(initValue))
  }

  return (
    <div className={s.container}>
      <div className={s.components}>
        <div className={s.leftSide}>
          <div className={s.buttonsWrapper}>
            <span>Show packs Cards</span>
            <div className={s.buttonsGroup}>
              <SuperButton onClick={showMyPacksHAndler} title={'MY'} className={s.myBtn}/>
              <SuperButton onClick={showAllPacksHAndler} title={'ALL'} className={s.allBtn}/>
            </div>
          </div>
          <div className={s.rangeWrapper}>
            <span>Number of Cards</span>
            <div className={s.valueContainer}>
              <span>{value1}</span>
              <span>{' '}</span>
              <span>{value2}</span>
            </div>
            <SuperDoubleRange
              onChangeRange={onChangeDoubleInputRangeHandle}
              value={[value1, value2]}
              setValue1={setValue1}
              setValue2={setValue2}
              min={0}
              max={100}
            />
          </div>

        </div>
        <div className={s.packsSide}>
          <h4>PACKS LIST</h4>
          <div className={s.searchContainer}>
            <SuperInputText onChange={addPackNameHandler} className={s.searchInput}/>
            <SuperButton value={inputValue} onClick={() => createPackHandler({cardsPack: pack.cardPacks[0]})}
                         title={'ADD NEW PACK'} className={s.searchButton}/>
          </div>

          <div className={s.packsContainer}>
            <div className={s.packListHeader}>
              <div className={s.nameTitle}>Name</div>
              <div className={s.cardsTitle}>Cards</div>
              <div onClick={sortUpdatedHandler} className={s.updateTitle}>Last Updated</div>
              <div className={s.nameTitle}>Created by</div>
              <div className={s.actionsTitle}>Actions</div>
            </div>
            <PackItem/>
          </div>

          <div className={s.paginationContainer}>
            123456789
          </div>
        </div>
      </div>
    </div>
  )
}