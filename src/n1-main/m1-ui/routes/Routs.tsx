import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom';
import {Error404} from '../pages/p1-error/Error404';
import {NewPassword} from '../pages/p6-newPassword/NewPassword';
import {PasswordRecovery} from '../pages/p5-passwordRecovery/PasswordRecovery';
import {Profile} from '../pages/p3-profile/Profile';
import Registration from "../pages/p4-registration/Registration";
import {Login} from "../pages/p2-login/Login";
import {PacksList} from "../pages/p8-packsList/PacksList";
import {LearningPage} from '../pages/p11-learningPage/LearningPage';
import {EmailAnswer} from "../pages/p10-emailAnswer/EmailAnswer";
import {CardsList} from '../pages/p9-cardsList/CardsList';

export const PATH = {
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE: '/profile',
    PASSWORD_RECOVERY: '/password-recovery',
    ENTERING_NEW_PASSWORD: '/set-new-password/:token',
    TEST: '/test',
    PACKS_LIST: '/packs-list',
    CARDS_LIST: '/cards-list/:urlCardsPackId',
    EMAIL_ANSWER: '/email-answer',
    MODAL: '/modal',
    LEARNING_PAGE: '/learning-page/:urlCardsPackId',
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
                <Route path={PATH.EMAIL_ANSWER} element={<EmailAnswer/>}/>
                <Route path={PATH.ENTERING_NEW_PASSWORD} element={<NewPassword/>}/>
                <Route path={PATH.PACKS_LIST} element={<PacksList/>}/>
                <Route path={PATH.CARDS_LIST} element={<CardsList/>}/>
                <Route path={PATH.LEARNING_PAGE} element={<LearningPage/>}/>
                <Route path="/*" element={<Error404/>}/>
            </Routes>
        </div>
    )
}