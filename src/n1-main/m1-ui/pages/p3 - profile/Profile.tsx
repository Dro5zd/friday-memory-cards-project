import React, {useEffect, useState} from 'react'
import s from './profilePage.module.css';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import noPhoto from '../../../../assets/img/noPhoto.png'
import {ProfileEdit} from './ProfileEdit';
import {NavLink, useNavigate, useParams} from 'react-router-dom';
import {PATH} from '../../routes/Routs';
import {AppStoreType, useTypedSelector} from '../../../m2-bll/store';
import {useSelector} from 'react-redux';

export const Profile = () => {
    const isAuthorised = useTypedSelector<boolean>(state => state.app.isAuthorised)
    const navigate = useNavigate()
    const params = useParams<string>()

    useEffect(() => {
        if (!isAuthorised) {
            navigate(PATH.LOGIN)
        }
    }, [params])
    const [mode, setMode] = useState(true)
    const changeMode = () => {
        setMode(!mode)
    }
    const login = useTypedSelector(state => state.auth.name)

    const avatar = useSelector<AppStoreType, string | undefined>(state => state.auth.avatar)
    // const dispatch = useDispatch<any>()
    return (
        <div className={s.profileContainer}>
            {mode ? <div className={s.components}>
                <div className={s.avatar}>
                    <img src={avatar || noPhoto} alt={'ava'}/>

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

