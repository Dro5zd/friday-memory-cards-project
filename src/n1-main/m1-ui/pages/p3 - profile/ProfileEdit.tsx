import React from 'react'
import s from './profilePage.module.css';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import noPhoto from '../../../../assets/img/noPhoto.png'
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';

export const ProfileEdit = () => {
    return (
        <div className={s.profileContainer}>
            <div className={s.components}>
                <div className={s.avatar}>

                    <h2 className={s.profileName}>Personal INFO</h2>

                    <img src={'' || noPhoto} alt={'ava'}/>

                    <SuperInputText placeholder={'Nickname'}/>
                    <SuperInputText placeholder={'Email'}/>

                </div>
                <div className={s.buttonBlock}>
                    <SuperButton title={'Cancel'}/>
                    <SuperButton title={'Save'}/>
                </div>
            </div>
        </div>
    )
}

