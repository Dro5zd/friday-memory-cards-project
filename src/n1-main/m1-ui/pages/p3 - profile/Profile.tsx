import React, {useState} from 'react'
import s from './profilePage.module.css';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import noPhoto from '../../../../assets/img/noPhoto.png'
import {ProfileEdit} from './ProfileEdit';
import {NavLink} from 'react-router-dom';
import {PATH} from '../../routes/Routs';
import {useTypedSelector} from '../../../m2-bll/store';

export const Profile = () => {
    const [mode, setMode] = useState(true)
    const changeMode = () => {
        setMode(!mode)
    }
    const login = useTypedSelector(state => state.auth.name)

    // const dispatch = useDispatch<any>()
    return (
        <div className={s.profileContainer}>
            {mode ? <div className={s.components}>
                <div className={s.avatar}>
                    <img src={'' || noPhoto} alt={'ava'}/>

                    <h2 className={s.profileName}>{login}</h2>
                </div>
                <SuperButton title={'Edit Profile'} onClick={changeMode}/>

                <NavLink to={PATH.LOGIN} className={navData => navData.isActive ? s.active : s.link}>
                    <span>Log Out</span>
                </NavLink>



            </div> : <ProfileEdit changeMode={changeMode}/>}
        </div>
    )
}

