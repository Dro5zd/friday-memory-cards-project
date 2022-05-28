import React, {useState} from 'react'
import SuperInputText from "../../common/c1-SuperInputText/SuperInputText";
import SuperCheckbox from "../../common/c3-SuperCheckbox/SuperCheckbox";
import SuperButton from "../../common/c2-SuperButton/SuperButton";
import s from './Login.module.css'
import {Register} from "../Register";
import {NavLink, Route, Routes} from "react-router-dom";
import {PATH} from "../../routes/Routs";

export const Login = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState<boolean>(false)

  return (
    <div className={s.loginContainer}>
      <div className={s.components}>
        <h1 className={s.loginTitle}>Friday Project</h1>
        <span className={s.loginSubTitle}>Sign in</span>
        <div className={s.inputWrapper}>
          <SuperInputText className={s.emailInput} type={"email"} placeholder={'email'}/>
          <SuperInputText className={s.passInput} type={"password"} placeholder={'password'}/>
        </div>
        <div className={s.linkCheckboxWrapper}>
          <div className={s.rememberWrapper}>
            <SuperCheckbox/>
            <span>Remember Me</span>
          </div>
          <div className={s.forgotLink}>
            <NavLink to={PATH.ENTERING_NEW_PASSWORD} className={navData => navData.isActive ? s.active : s.link}>
              Forgot Password
            </NavLink>
          </div>
        </div>
        <div>
          <SuperButton className={s.loginButton} title={'Login'}/>
        </div>
        <span>Don't have an account?</span>
        <NavLink to={PATH.REGISTER} className={navData => navData.isActive ? s.active : s.link}>
          Sing Up
        </NavLink>
      </div>
    </div>
  )
}
