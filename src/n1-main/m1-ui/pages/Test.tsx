import React from 'react'
import SuperInputText from '../common/c1-SuperInputText/SuperInputText';
import SuperButton from '../common/c2-SuperButton/SuperButton';
import SuperCheckbox from '../common/c3-SuperCheckbox/SuperCheckbox';
import s from './test.module.css'

export const Test = () => {
    return (
        <div className={s.container}>
            <div className={s.components}>
                <SuperInputText/>
                <SuperButton>
                    BUTTON
                </SuperButton>
                <SuperCheckbox/>
            </div>

        </div>
    )
}
