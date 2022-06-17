import React from 'react'
import s from './SuperDoubleRange.module.css'
import SuperRange from '../c10-SuperRange/SuperRange';

type SuperDoubleRangePropsType = {
    onChangeRange?: (value: [number, number]) => void
    value: [number, number]
    min: number
    max: number
    setValue1: (n: number) => void
    setValue2: (n: number) => void
    onMouseUpSetFilter: () => void
}

export const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (
    {
        onChangeRange, onMouseUpSetFilter, value,
        min, max,
        ...props
    }
) => {

    const f1 = (n: number) => {
        if ((value[1] - 5) <= n) return
        props.setValue1(n)
    }
    const f2 = (n: number) => {
        if ((value[0] + 5) >= n) return
        props.setValue2(n)
    }

    return (
        <div className={s.double}>
            <SuperRange value={value[0]} min={min} max={max} onMouseUp={() => {onMouseUpSetFilter()}}
                        onChangeRange={f1}
                        styleClassNameRange={s.rangePosition}
            />
            <SuperRange value={value[1]} min={min} max={max} onMouseUp={() => {onMouseUpSetFilter()}}
                        onChangeRange={f2}
            />
        </div>
    )
}
