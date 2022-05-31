import React from 'react'
import SuperInputText from "../../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../common/c2-SuperButton/SuperButton";
import {NavLink} from "react-router-dom";
import {PATH} from "../../routes/Routs";
import s from './PasswordRecovery.module.css'
import {useForm} from "react-hook-form";

export const PasswordRecovery = () => {
    const {register, handleSubmit, reset} = useForm()
    const onSumbit = (date: any) => {}
    return (
        <div className={s.recoveryContainer}>
            <div className={s.components}>
                <div className={s.recoveryTitle}>Friday project</div>
                <div className={s.recoverySubTitle}>Forgot password?</div>
                <form className={s.inputWrapper} onSubmit={handleSubmit(onSumbit)}>
                    <SuperInputText className={s.emailInput} type={'email'} placeholder={'Email'}/>
                    <span className={s.span}>Enter your email address and we will send you <br/> further instructions</span>
                    <SuperButton className={s.sendButton} title={'Send'}/>
                </form>
                <NavLink className={s.toLoginLink} to={PATH.LOGIN}>Try to Log In</NavLink>
            </div>
        </div>
    )
}
