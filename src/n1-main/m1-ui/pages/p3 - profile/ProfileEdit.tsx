import React from 'react'
import s from './profilePage.module.css';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import noPhoto from '../../../../assets/img/noPhoto.png'
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';

type ProfileEditType = {
    changeMode: (mode: boolean) => void
}

export const ProfileEdit = (props: ProfileEditType) => {
    return (
        <div className={s.profileContainer}>
            <div className={s.components}>

                <div className={s.avatar}>
                    <h2 className={s.profileName}>Personal Information</h2>
                    <img src={'' || noPhoto} alt={'ava'}/>
                </div>

                <div className={s.inputBlock}>
                    <SuperInputText placeholder={'Nickname'}/>
                    <SuperInputText placeholder={'Email'}/>
                </div>

                <div className={s.buttonBlock}>
                    <SuperButton className={s.cancelButton} title={'Cancel'} onClick={() => props.changeMode(true)}/>
                    <SuperButton title={'Save'} onClick={() => props.changeMode(true)}/>
                </div>
            </div>
        </div>
    )
}

