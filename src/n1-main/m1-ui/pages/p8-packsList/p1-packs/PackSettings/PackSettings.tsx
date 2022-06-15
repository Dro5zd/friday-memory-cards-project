import React, {useEffect, useState} from 'react';
import s from './PackSettings.module.css';
import {SuperDoubleRange} from '../../../../common/c9-SuperDoubleRange/SuperDoubleRange';
import {setMyAllFilterAC, setRangeValueAC} from '../../../../../m2-bll/sortReducer';
import {useTypedDispatch, useTypedSelector} from '../../../../../m2-bll/store';
import {changePacksCurrentPageAC} from '../../../../../m2-bll/appReducer';

type PackSettingsType = {
  minCardsCount: number;
  maxCardsCount: number;
  minRangeValue: number;
  maxRangeValue: number;
}

export const PackSettings: React.FC<PackSettingsType> = ({
                                                           minCardsCount,
                                                           maxCardsCount,
                                                           minRangeValue,
                                                           maxRangeValue
                                                         }) => {

  useEffect(() => {
    setValue1(minRangeValue)
    setValue2(maxRangeValue)
  }, [maxRangeValue, minRangeValue])

  const userId = useTypedSelector(state => state.auth._id)
  const checkedRadio = useTypedSelector(state => state.sort.user_id)
  const [value1, setValue1] = useState(minCardsCount)
  const [value2, setValue2] = useState(maxCardsCount)

  const dispatch = useTypedDispatch()

  /* const onChangeDoubleInputRangeHandle = (nums: Array<number>) => {
       debugger
       setValue1(nums[0])
       setValue2(nums[ModalEditedForHeader])
   }*/

  const showMyPacksHandler = () => {
    dispatch(setMyAllFilterAC(userId))
    //dispatch(setRangeValueAC(minCardsCount, maxCardsCount))
    dispatch(changePacksCurrentPageAC(1));
  }
  const showAllPacksHandler = () => {
    dispatch(setMyAllFilterAC(''))
    dispatch(changePacksCurrentPageAC(1));
    //dispatch(setRangeValueAC(minCardsCount, maxCardsCount))
  }

  const onMouseUpSetFilter = () => {
    dispatch(setRangeValueAC(value1, value2))
  }

  return (
    <div className={s.leftSide}>
      <div className={s.packListTitle}>PACKS LIST</div>
      <div className={s.buttonsWrapper}>
        <div className={s.buttonsGroupSpan}>
          <span>Show packs Cards</span>
        </div>
        <div className={s.segmentedControl}>
          <input type="radio" name="radio" id="tab1" defaultChecked={!checkedRadio}/>
          <label htmlFor="tab1" className={s.segmentedControlItem1}
                 onClick={showAllPacksHandler}>ALL</label>

          <input type="radio" name="radio" id="tab2" defaultChecked={!!checkedRadio}/>
          <label htmlFor="tab2" className={s.segmentedControlItem2}
                 onClick={showMyPacksHandler}>MY</label>
          <div className={s.segmentedControlColor}></div>
        </div>
      </div>
      <div className={s.rangeWrapper}>
        <div className={s.rangeSpan}>
          <span>Number of Cards</span>
        </div>
        <div className={s.range}>
          <SuperDoubleRange
            onMouseUpSetFilter={onMouseUpSetFilter}
            value={[value1, value2]}
            setValue1={setValue1}
            setValue2={setValue2}
            min={minRangeValue}
            max={maxRangeValue}
          />
        </div>
      </div>
    </div>
  );
};