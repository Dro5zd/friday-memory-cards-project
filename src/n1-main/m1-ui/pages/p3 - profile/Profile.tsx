import React from 'react'
import s from './profilePage.module.css';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import noPhoto from '../../../../assets/img/noPhoto.png'
import {ProfileEdit} from './ProfileEdit';

export const Profile = () => {
    return (
        <div className={s.profileContainer}>
            <div className={s.components}>
                <div className={s.avatar}>
                    <img src={'' || noPhoto} alt={'ava'}/>

                    <h2 className={s.profileName}>Your Name</h2>

                    <h3 className={s.profileStatus}>Your Status</h3>
                </div>
                <SuperButton title={'Edit Profile'}/>
            </div>
            <ProfileEdit/>
        </div>
    )
}

