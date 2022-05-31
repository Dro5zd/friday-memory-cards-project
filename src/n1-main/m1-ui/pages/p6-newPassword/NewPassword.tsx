import React, {useEffect} from 'react';
import s from './NewPassword.module.css'
import SuperInputText from "../../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../common/c2-SuperButton/SuperButton";
import {newPassTC, setPassChangedAC} from "../../../m2-bll/newPasswordReducer";
import {NewPassParamsType} from "../../../m3-dal/auth-api";
import {useForm} from "react-hook-form";
import {useTypedDispatch, useTypedSelector} from "../../../m2-bll/store";
import {PATH} from "../../routes/Routs";
import {useNavigate, useParams} from "react-router-dom";

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
      // если undefined || null дает строку
      resetPasswordToken: token ?? ''
    }
    dispatch(newPassTC(payload))
    reset()
  }

  useEffect(() => {
    if (passChanged) {
      //если диспатчить меня редиректит на профайл а должно на логин
      // диспатч для того чтоб пассЧендж на фолс
      dispatch(setPassChangedAC(false))
      navigate(PATH.LOGIN)
    }
  }, [passChanged, navigate])

  return (
    <div className={s.newPassContainer}>
      <div className={s.components}>
        <div className={s.newPassTitle}>Friday Project</div>
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
              type={'password'}
              placeholder={'New password'}
            />
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
              style={{height: '50px', width: '21.4rem'}}
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