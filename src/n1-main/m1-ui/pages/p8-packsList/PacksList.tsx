import React, {useState} from 'react'
import s from './packsList.module.css'
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import {SuperDoubleRange} from '../../common/c9-SuperDoubleRange/SuperDoubleRange';
import {PackItem} from "./p1-packs/PackItem";

export const PacksList = () => {

    const [value1, setValue1] = useState(40)
    const [value2, setValue2] = useState(100)

    // const onChangeInputRangeHandle = (num: number) => {
    //     if (num >= value2) return
    //     setValue1(num)
    // }

    const onChangeDoubleInputRangeHandle = (nums: Array<number>) => {
        setValue1(nums[0])
        setValue2(nums[1])
    }
    return (
        <div className={s.container}>
            <div className={s.components}>
                <div className={s.leftSide}>
                    <div className={s.buttonsWrapper}>
                        <span>Show packs Cards</span>
                        <div className={s.buttonsGroup}>
                            <SuperButton title={'MY'}/>
                            <SuperButton title={'ALL'}/>
                        </div>
                    </div>
                    <div className={s.rangeWrapper}>
                        <span>Number of Cards</span>
                        <div className={s.valueContainer}>
                            <span>{value1}</span>
                            <span>{value2}</span>
                        </div>
                        <SuperDoubleRange onChangeRange={onChangeDoubleInputRangeHandle}
                                          value={[value1, value2]}
                                          setValue1={setValue1}
                                          setValue2={setValue2}
                                          min={0}
                                          max={100}
                         />
                    </div>

                </div>
                <div className={s.packsSide}>
                    <h2>PACKS LIST</h2>
                    <div className={s.searchContainer}>
                        <SuperInputText/>
                        <SuperButton title={'ADD NEW PACK'}/>
                    </div>

                    <div className={s.packsContainer}>
                        <header>
                            <ul>
                                <li>Name</li>
                                <li>Cards</li>
                                <li>Last Updated</li>
                                <li>Created by</li>
                                <li>Actions</li>
                            </ul>
                        </header>
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


