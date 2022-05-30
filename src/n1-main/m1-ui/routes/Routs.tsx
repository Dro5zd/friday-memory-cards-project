import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom';
import {Error404} from '../pages/p1 - error/Error404';
import {Login} from '../pages/p2 - login/Login';
import {NewPassword} from '../pages/NewPassword';
import {Test} from '../pages/p7 - test/Test';
import {PasswordRecovery} from '../pages/p5-passwordRecovery/PasswordRecovery';
import {Profile} from '../pages/p3 - profile/Profile';
import Registration from "../pages/p4 - registration/Registration";

export const PATH = {
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE: '/profile',
    PASSWORD_RECOVERY: '/password-recovery',
    ENTERING_NEW_PASSWORD: '/set-new-password',
    TEST: '/test',
}

export const Routs = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Navigate replace to={PATH.PROFILE}/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTER} element={<Registration/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery/>}/>
                <Route path={PATH.ENTERING_NEW_PASSWORD} element={<NewPassword/>}/>
                <Route path={PATH.TEST} element={<Test/>}/>
                <Route path="/*" element={<Error404/>}/>
            </Routes>
        </div>
    )
}