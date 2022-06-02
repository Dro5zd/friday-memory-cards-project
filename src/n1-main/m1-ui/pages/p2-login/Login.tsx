import React, {useEffect, useState} from 'react';
import s from './Login.module.css'
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';
import SuperCheckbox from '../../common/c3-SuperCheckbox/SuperCheckbox';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import {NavLink, useNavigate} from 'react-router-dom';
import {PATH} from '../../routes/Routs';
import {useForm} from 'react-hook-form';
import {useTypedDispatch, useTypedSelector} from '../../../m2-bll/store';
import {loginFormTC} from '../../../m2-bll/loginReducer';
import mainLogo from '../../../../assets/img/B.A.D._logo3.png';
import passViewOn from '../../../../assets/img/view.svg'
import passViewOff from '../../../../assets/img/no-view.svg'

export const Login = () => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<LoginFormType>()
    const isAuthorised = useTypedSelector(state => state.app.isAuthorised)
    const loginError = useTypedSelector(state => state.auth.error)
    const dispatch = useTypedDispatch()
    const navigate = useNavigate()
    const onSubmit = (data: LoginFormType) => {
        dispatch(loginFormTC(data))
        reset()
    }
    useEffect(() => {
        if (isAuthorised) {
            navigate(PATH.PACKS_LIST)
        }
    }, [isAuthorised, navigate])

    const [passOn, setPassOn] = useState(true)

    const changeView = () => {
        setPassOn(!passOn)
    }
    let inputType = 'text'
    if (passOn) {
        inputType = 'password'
    }

    return (
        <div className={s.loginContainer}>
            <div className={s.components}>
                <div className={s.loginTitle}><img src={mainLogo} alt="main_logo"/>
                </div>
                <span className={s.loginSubTitle}>Sign in</span>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={s.inputWrapper}>
                        <SuperInputText
                            {...register('email', {
                                required: true,
                                pattern: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
                            })}
                            type={'email'}
                            placeholder={'Email'}
                        />
                        <SuperInputText
                            {...register('password', {
                                required: true,
                                minLength: 8,
                            })}
                            type={inputType}
                            placeholder={'Password'}
                        /> <img className={s.passwordControl} src={passOn ? passViewOn : passViewOff} alt="passwordOn/Off"
                                onClick={changeView}/>
                    </div>
                    <div className={s.rememberWrapper}>
                        <SuperCheckbox
                            className={s.rememberCheckbox}
                        />
                        <span>Remember Me</span>
                    </div>
                    <div className={s.buttonWrapper}>
                        <SuperButton
                            className={s.loginButton}
                            title={'Login'}
                        />
                    </div>
                </form>
                <div className={s.footerWrapper}>
                    <div>
                        <span className={s.newUserSpan}>New User?</span>
                        <NavLink to={PATH.REGISTER} className={s.toRegisterLink}>
                            <span>Sing Up</span>
                        </NavLink>
                    </div>
                    <div className={s.forgotLink}>
                        <NavLink to={PATH.PASSWORD_RECOVERY} className={s.forgotPassLink}>
                            <span>Forgot Password</span>
                        </NavLink>
                    </div>
                </div>
                <div className={s.errorBlock}>
                    {errors.email && <span>Email is not correct</span>}
                    {errors.password && <span>Password should be more then 7 char</span>}
                    <span>{loginError}</span>
                </div>
            </div>
        </div>
    );
};

// types
export type LoginFormType = {
    email: string
    password: string
    rememberMe: boolean
}