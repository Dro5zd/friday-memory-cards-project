import React, {useEffect, useState} from 'react';
import s from './NewPassword.module.css'
import SuperInputText from "../../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../common/c2-SuperButton/SuperButton";
import {newPassTC, setPassChangedAC} from "../../../m2-bll/newPasswordReducer";
import {NewPassParamsType} from "../../../m3-dal/auth-api";
import {useForm} from "react-hook-form";
import {useTypedDispatch, useTypedSelector} from "../../../m2-bll/store";
import {PATH} from "../../routes/Routs";
import {useNavigate, useParams} from "react-router-dom";
import mainLogo from '../../../../assets/img/B.A.D._logo3.png';
import passViewOn from '../../../../assets/img/view.svg';
import passViewOff from '../../../../assets/img/no-view.svg';

export const NewPassword = () => {
  const passChanged = useTypedSelector(state => state.newPassword.passChanged)
  const {register, handleSubmit, reset, formState: {errors}} = useForm<InputPassType>()
  const newPassError = useTypedSelector(state => state.newPassword.error)
  const dispatch = useTypedDispatch()
  const navigate = useNavigate()
  const {token} = useParams<{ token: string }>()
  const onSubmit = (newPassData: InputPassType) => {
    const payload: NewPassParamsType = {
      password: newPassData.password,
      // если undefined || null тогда дает строку
      resetPasswordToken: token ?? ''
    }
    dispatch(newPassTC(payload))
    reset()
  }

  useEffect(() => {
    if (passChanged) {
      //если диспатч кинуть в зависимости меня редиректит на профайл а должно на логин
      dispatch(setPassChangedAC(false))
      navigate(PATH.LOGIN)
    }
  }, [passChanged, navigate])

  const [passOn, setPassOn] = useState(true)

  const changeView = () => {
    setPassOn(!passOn)
  }
  let inputType = 'text'
  if (passOn) {
    inputType = 'password'
  }

  return (
    <div className={s.newPassContainer}>
      <div className={s.components}>
        <div className={s.newPassTitle}><img src={mainLogo} alt="main_logo"/></div>
        <div className={s.newPassSubTitle}>Create new password</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.inputNewPassWrapper}>
            <SuperInputText
              {...register('password', {
                required: true,
                minLength: 8,
              })}
              style={{height: '55px'}}
              className={s.newPassInput}
              type={inputType}
              placeholder={'New password'}
            />
            <img className={s.passwordControl} src={passOn ? passViewOn : passViewOff} alt="passwordOn/Off"
                 onClick={changeView}/>
          </div>
          <div className={s.instructionsSpan}>
          <span>
            Create new password and we will send you
            <br/>
            further instructions to email
          </span>
          </div>
          <div className={s.newPassButtonWrapper}>
            <SuperButton
              className={s.newPassButton}
              title={'Create New Password'}
            />
          </div>
        </form>
        <div className={s.errorBlock}>
          {errors.password && <span>Password should be more then 7 char</span>}
          <span>{newPassError}</span>
        </div>
      </div>
    </div>
  );
};

//types
type InputPassType = {
  password: string,
}