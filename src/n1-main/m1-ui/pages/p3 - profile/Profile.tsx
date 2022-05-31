import React, {useEffect, useState} from 'react'
import s from './profilePage.module.css';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import noPhoto from '../../../../assets/img/noPhoto.png'
import {ProfileEdit} from './ProfileEdit';
import {NavLink, useNavigate, useParams} from 'react-router-dom';
import {PATH} from '../../routes/Routs';
import {useTypedDispatch, useTypedSelector} from '../../../m2-bll/store';
import {logOutMeTC} from '../../../m2-bll/appReducer';

export const Profile = () => {
    const isAuthorised = useTypedSelector<boolean>(state => state.app.isAuthorised)
    const navigate = useNavigate()
    const params = useParams<string>()
    const dispatch = useTypedDispatch()

    useEffect(() => {
        if (!isAuthorised) {
            navigate(PATH.LOGIN)
        }
    }, [params])
    const [mode, setMode] = useState(true)

    const changeMode = () => {
        setMode(!mode)
    }

    const logOutHandler = () => {
        dispatch(logOutMeTC())
    }

    const name = useTypedSelector(state => state.profile.name)
    const nameMe = useTypedSelector(state => state.auth.name)

    const avatar = useTypedSelector(state => state.profile.avatar)
    const avatarMe = useTypedSelector(state => state.auth.avatar)

    // const dispatch = useDispatch<any>()
    return (
        <div className={s.profileContainer}>
            {mode ? <div className={s.components}>
                <div className={s.avatar}>
                    <img src={ avatarMe || avatar || noPhoto} alt={'ava'}/>

                    <h2 className={s.profileName}>{name || nameMe || 'Name'}</h2>
                </div>
                <SuperButton className={s.editButton} title={'Edit Profile'} onClick={changeMode}/>

                <NavLink to={PATH.LOGIN} className={navData => navData.isActive ? s.active : s.link}>
                    <span className={s.link}>Log Out</span>
                    <span className={s.link} onClick={logOutHandler}>Log Out</span>
                </NavLink>



            </div> : <ProfileEdit changeMode={changeMode}/>}
        </div>
    )
}

