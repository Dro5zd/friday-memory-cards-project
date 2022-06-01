import React from 'react'
import SuperInputText from "../../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../common/c2-SuperButton/SuperButton";
import {NavLink} from "react-router-dom";
import {PATH} from "../../routes/Routs";
import s from './PasswordRecovery.module.css'
import {useForm} from "react-hook-form";
import {useTypedDispatch, useTypedSelector} from "../../../m2-bll/store";
import {setRecoveryInfoAC, setRecoveryTC} from "../../../m2-bll/passwordRecoveryReducer";
import mainLogo from '../../../../assets/img/B.A.D._logo3.png';

export const PasswordRecovery = () => {
  const serverMessage = useTypedSelector<string>(state => state.passwordRecovery.info)
  const dispatch = useTypedDispatch();
  const {register, handleSubmit, reset, formState: {errors}} = useForm<{ email: string }>()
  const onSubmit = (data: { email: string }) => {
    dispatch(setRecoveryTC(data.email))
    reset()
    setTimeout(() => {
      dispatch(setRecoveryInfoAC(''))
    }, 7000)
  }
  return (
    <div className={s.recoveryContainer}>
      <div className={s.components}>
        <div className={s.recoveryTitle}><img src={mainLogo} alt="main_logo"/></div>
        <div className={s.recoverySubTitle}>Forgot password?</div>
        <form className={s.inputWrapper} onSubmit={handleSubmit(onSubmit)}>
          <SuperInputText
            {...register('email', {
              required: true,
              pattern: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
            })} className={s.emailInput} placeholder={'Email'}/>
          <span className={s.span}>Enter your email address and we will send you <br/> further instructions</span>
          <SuperButton className={s.sendButton} title={'Send'}/>
        </form>
        <NavLink className={s.toLoginLink} to={PATH.LOGIN}>Try to Log In</NavLink>
        <div className={s.errorBlock}>
          {errors.email && <span>Email is not correct</span>}
          {serverMessage && <span>{serverMessage} please check your email</span>}
        </div>
      </div>
    </div>
  )
}
