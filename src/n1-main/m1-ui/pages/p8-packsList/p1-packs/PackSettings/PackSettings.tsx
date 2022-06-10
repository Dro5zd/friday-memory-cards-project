import React, {useEffect, useState} from 'react';
import s from './PackSettings.module.css';
import {SuperDoubleRange} from "../../../../common/c9-SuperDoubleRange/SuperDoubleRange";
import {setMyAllFilterAC, setRangeValueAC} from "../../../../../m2-bll/sortReducer";
import {getCardPackTC} from "../../../../../m2-bll/cardPacksReducer";
import {useTypedDispatch, useTypedSelector} from "../../../../../m2-bll/store";

export  const PackSettings = () => {
  const pack = useTypedSelector(state => state.packs)
  const userId = useTypedSelector(state => state.auth._id)
  const sortUserId = useTypedSelector(state => state.sort.user_id)
  const packNameValue = useTypedSelector(state => state.sort.packName)
  const dispatch = useTypedDispatch()

 useEffect(()=> {
   setValue1(pack.minCardsCount)
   setValue2(pack.maxCardsCount)
 }, [pack.minCardsCount, pack.maxCardsCount, sortUserId, packNameValue])

  const onChangeDoubleInputRangeHandle = (nums: Array<number>) => {
    setValue1(nums[0])
    setValue2(nums[1])
  }

  const [value1, setValue1] = useState(pack.minCardsCount)
  const [value2, setValue2] = useState(pack.maxCardsCount)

  const showMyPacksHandler = () => {
    dispatch(setMyAllFilterAC(userId))
    dispatch(setRangeValueAC(0, value2))
  }
  const showAllPacksHandler = () => {
    dispatch(setMyAllFilterAC(''))
  }

  const onMouseUpSetFilter = () => {
    dispatch(setRangeValueAC(value1, value2))
    dispatch(getCardPackTC())
  }

  return (
    <div>
      <div className={s.leftSide}>
        <div className={s.packListTitle}>PACKS LIST</div>
        <div className={s.buttonsWrapper}>
          <div className={s.buttonsGroupSpan}>
            <span>Show packs Cards</span>
          </div>

          <div className={s.segmentedControl}>
            <input type="radio" name="radio"  id="tab1"/>
            <label htmlFor="tab1" className={s.segmentedControlItem1} onClick={showAllPacksHandler}>ALL</label>

            <input type="radio" name="radio"  id="tab2" />
            <label htmlFor="tab2" className={s.segmentedControlItem2} onClick={()=>showMyPacksHandler()}>MY</label>
            <div className={s.segmentedControlColor}></div>
          </div>
        </div>
        <div className={s.rangeWrapper}>
          <div className={s.rangeSpan}>
            <span>Number of Cards</span>
          </div>
          {/*<div className={s.valueContainer}>*/}
          {/*    <span>{`${value1} - ${value2}`}</span>*/}
          {/*</div>*/}
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
    </div>
  );
};