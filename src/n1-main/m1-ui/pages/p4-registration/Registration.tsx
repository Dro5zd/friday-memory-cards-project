import React, {useState} from 'react';
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';
import {useForm} from 'react-hook-form';
import s from './Registration.module.css'
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import {useTypedDispatch, useTypedSelector} from '../../../m2-bll/store';
import {registerTC} from '../../../m2-bll/registerReducer';
import {useNavigate, NavLink} from 'react-router-dom';
import {PATH} from '../../routes/Routs';
import mainLogo from '../../../../assets/img/B.A.D._logo3.png';

export type RegistrationFormType = {
    email: string
    password: string
    confirmPassword: string
}

const Registration = () => {

    const isRegistered = useTypedSelector<boolean>(state => state.register.isRegistered);
    const serverError = useTypedSelector<string | undefined>(state => state.register.error);
    const [passOn, setPassOn] = useState(true);
    const [passOn1, setPassOn1] = useState(true);

    const {register, handleSubmit, reset, watch, formState: {errors}} = useForm<RegistrationFormType>();
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();
    const onSubmit = (data: RegistrationFormType) => {
        const {email, password} = data
        dispatch(registerTC({email, password}))
        reset()
    };
    if (isRegistered) {
        navigate(PATH.LOGIN)
    }

    return (
        <div className={s.registrationContainer}>
            <div className={s.components}>
                <div className={s.registrationTitle}><img src={mainLogo} alt="main_logo"/></div>
                <div className={s.registrationSubTitle}>Sign up</div>
                <form onSubmit={handleSubmit(onSubmit)} className={s.inputWrapper}>
                    <SuperInputText {...register('email', {
                        required: true,
                        pattern: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
                    })} type={'email'} placeholder={'Email'}/>

                    <div className={s.passwordInput}>
                        <SuperInputText {...register('password', {required: true, minLength: 8})}
                                        type={passOn ? 'password' : 'text'}
                                        placeholder={'Password'} passOn={passOn} setPassOn={setPassOn}/>
                    </div>
                    <div className={s.passwordConfirmInput}>
                        <SuperInputText
                            {...register('confirmPassword', {
                                validate: (value: string) => {
                                    if (watch('password') !== value) {
                                        return 'Your passwords do no match'
                                    }
                                }
                            })}
                            type={passOn1 ? 'password' : 'text'}
                            placeholder={'Confirm Password'} passOn={passOn1} setPassOn={setPassOn1}
                        />
                    </div>
                    <SuperButton className={s.registrationButton} title={'Sign Up'} type={'submit'}/>
                    <div className={s.navigateBlock}>
                        <span>Already have an account?</span>
                        <NavLink className={s.toLoginLink} to={PATH.LOGIN}>Login</NavLink>
                    </div>
                    <div className={s.errorBlock}>
                        {errors.email && <span>Email is not correct</span>}
                        {errors.password && <span>Password should be more then 7 char</span>}
                        <span>{errors.confirmPassword?.message}</span>
                        <span>{serverError}</span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registration;