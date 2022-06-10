import React from 'react';
import s from './PackSettings.module.css';
import {SuperDoubleRange} from '../../../../common/c9-SuperDoubleRange/SuperDoubleRange';
import {setMyAllFilterAC, setRangeValueAC} from '../../../../../m2-bll/sortReducer';
import {getCardPackTC} from '../../../../../m2-bll/cardPacksReducer';
import {useTypedDispatch, useTypedSelector} from '../../../../../m2-bll/store';

type PackSettingsType = {
    value1: number
    value2: number
    setValue1: (value: number)=>void
    setValue2: (value: number)=>void
}

export const PackSettings: React.FC<PackSettingsType> = ({value1, value2, setValue1, setValue2}) => {
    const pack = useTypedSelector(state => state.packs)
    const userId = useTypedSelector(state => state.auth._id)
    const checkedRadio = useTypedSelector(state => state.sort.user_id)

    // const sortUserId = useTypedSelector(state => state.sort.user_id)
    // const packNameValue = useTypedSelector(state => state.sort.packName)
    const dispatch = useTypedDispatch()

    const onChangeDoubleInputRangeHandle = (nums: Array<number>) => {
        setValue1(nums[0])
        setValue2(nums[1])
    }

    const showMyPacksHandler = () => {
        dispatch(setMyAllFilterAC(userId))
        dispatch(setRangeValueAC(0, 2000))
    }
    const showAllPacksHandler = () => {
        dispatch(setMyAllFilterAC(''))
        dispatch(setRangeValueAC(0, 2000))
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
                        <input type="radio" name="radio" id="tab1" checked={!checkedRadio}/>
                        <label htmlFor="tab1" className={s.segmentedControlItem1}
                               onClick={showAllPacksHandler}>ALL</label>

                        <input type="radio" name="radio" id="tab2" checked={!!checkedRadio}/>
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