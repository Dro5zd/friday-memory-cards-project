import React from 'react';
import SuperInputText from "../../common/c1-SuperInputText/SuperInputText";
import {useForm} from "react-hook-form";
import s from "./Registration.module.css"
import SuperButton from "../../common/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../m2-bll/store";
import {registerTC} from "../../../m2-bll/registerReducer";
import {useNavigate, NavLink} from "react-router-dom";
import {PATH} from "../../routes/Routs";

export type RegistrationFormType = {
    email: string
    password: string
    confirmPassword: string
}


const Registration = () => {
    const isRegistered = useSelector<AppStoreType, boolean>(state => state.register.isRegistered)
    const serverError = useSelector<AppStoreType, string | undefined>(state => state.register.error)
    const dispatch = useDispatch<any>()
    const {register, handleSubmit, reset} = useForm<RegistrationFormType>()
    const navigate = useNavigate()
    const onSubmit = (data: RegistrationFormType) => {
        const email = data.email
        const password = data.password
        dispatch(registerTC({email, password}))
        reset()
    }
    if (isRegistered) {
        navigate(PATH.LOGIN)
    }
    return (
        <div className={s.registrationContainer}>
            <div className={s.components}>
                <div className={s.registrationTitle}>Friday project</div>
                <div className={s.registrationSubTitle}>Sign Up</div>
                <form onSubmit={handleSubmit(onSubmit)} className={s.inputWrapper}>
                    <label className={s.label}>Email</label>
                    <SuperInputText {...register('email')} type={"text"}/>
                    <label className={s.label}>Password</label>
                    <SuperInputText {...register('password')} type={"password"}/>
                    <label className={s.label}>Confirm password</label>
                    <SuperInputText {...register('confirmPassword')} type={"password"}/>
                    <SuperButton className={s.registrationButton} title={'Sign Up'} type={"submit"}/>
                    <div className={s.navigate}>
                        <span>Already have an account?</span>
                        <NavLink to={PATH.LOGIN}>Login</NavLink>
                    </div>
                    <span>{serverError}</span>
                </form>
            </div>
        </div>
    );
};

export default Registration;