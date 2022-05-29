import React, {ChangeEvent, useState} from 'react'
import SuperInputText from "../../common/c1-SuperInputText/SuperInputText";
import SuperCheckbox from "../../common/c3-SuperCheckbox/SuperCheckbox";
import SuperButton from "../../common/c2-SuperButton/SuperButton";
import s from './Login.module.css'
import {NavLink} from "react-router-dom";
import {PATH} from "../../routes/Routs";
import {loginTC} from "../../../m2-bll/loginReducer";
import {useTypedDispatch, useTypedSelector} from "../../../m2-bll/store";

export const Login = () => {

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const dispatch = useTypedDispatch()

  const loginData = useTypedSelector(state => state.auth)

  const loginValue = {
    email: login,
    password: password,
    rememberMe: remember
  }

  const onclickLoginHandler = () => {
    setLogin(login)
    setPassword(password)
    setLogin('')
    setPassword('')
    dispatch(loginTC(loginValue))
    console.log(loginData)
  }

  const onChangeLoginHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.currentTarget.value)
  }
  const onChangePassHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }

  return (
    <div className={s.loginContainer}>
      <div className={s.components}>

        <h1 className={s.loginTitle}>Friday Project</h1>

        <span className={s.loginSubTitle}>Sign in</span>

        <div className={s.inputWrapper}>
          <SuperInputText
            onChange={onChangeLoginHandler}
            value={login}
            className={s.emailInput}
            type={"email"}
            placeholder={'email'}
          />
          <SuperInputText
            onChange={onChangePassHandler}
            value={password}
            className={s.passInput}
            type={"password"}
            placeholder={'password'}
          />
        </div>

        <div className={s.rememberWrapper}>
          <SuperCheckbox
            checked={remember}
            onChangeChecked={setRemember}
            className={s.rememberCheckbox}
          />
          <span>Remember Me</span>
        </div>

        <div>
          <SuperButton
            onClick={onclickLoginHandler}
            className={s.loginButton}
            title={'Login'}
          />
        </div>

        <div className={s.footerWrapper}>
          <div>
            <span className={s.newUserSpan}>New User?</span>
            <NavLink to={PATH.REGISTER} className={s.toRegisterLink}>
              <span className={s.signUpSpan}>Sing Up</span>
            </NavLink>
          </div>

          <div className={s.forgotLink}>
            <NavLink to={PATH.ENTERING_NEW_PASSWORD} className={s.forgotPassLink}>
              <span>Forgot Password</span>
            </NavLink>
          </div>

        </div>
      </div>
    </div>
  )
}
