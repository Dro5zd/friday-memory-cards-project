import React from 'react';
import s from './Header.module.css'
import {NavLink} from 'react-router-dom';
import {PATH} from '../routes/Routs';

export const Header = () => {
    return (
        <div className={s.header}>
            <NavLink to={PATH.REGISTER} className={navData => navData.isActive ? s.active : s.link}>
                Register
            </NavLink>
            <NavLink to={PATH.LOGIN} className={navData => navData.isActive ? s.active : s.link}>
                Login
            </NavLink>
            <NavLink to={PATH.PROFILE} className={navData => navData.isActive ? s.active : s.link}>
                Profile
            </NavLink>
            <NavLink to={PATH.PASSWORD_RECOVERY} className={navData => navData.isActive ? s.active : s.link}>
                Password Recovery
            </NavLink>
            <NavLink to={PATH.ENTERING_NEW_PASSWORD} className={navData => navData.isActive ? s.active : s.link}>
                New Password
            </NavLink>
            <NavLink to={PATH.TEST} className={navData => navData.isActive ? s.active : s.link}>
                Test
            </NavLink>
        </div>
    );
}
