import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom';
import {Error404} from '../pages/p1 - error/Error404';
import {Login} from '../pages/p2 - login/Login';
import {NewPassword} from '../pages/NewPassword';
import {Register} from '../pages/Register';
import {Test} from '../pages/p7 - test/Test';
import {PasswordRecovery} from '../pages/PasswordRecovery';
import {Profile} from '../pages/p3 - profile/Profile';

export const PATH = {
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE: '/profile',
    PASSWORD_RECOVERY: '/password-recovery',
    ENTERING_NEW_PASSWORD: '/new-password',
    TEST: '/test',
}

export const Routs = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Navigate replace to={PATH.LOGIN}/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTER} element={<Register/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery/>}/>
                <Route path={PATH.ENTERING_NEW_PASSWORD} element={<NewPassword/>}/>
                <Route path={PATH.TEST} element={<Test/>}/>
                <Route path="/*" element={<Error404/>}/>
            </Routes>
        </div>
    )
}