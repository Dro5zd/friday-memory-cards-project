import React, {useEffect, useState} from 'react';
import './App.css';
import {Main} from './Main';
import {useTypedDispatch, useTypedSelector} from "../m2-bll/store";
import {authoriseMeTC} from "../m2-bll/appReducer";
import Preloader from "./common/c7-Preloader/Preloader";
import s from './common/c8-Switcher/Switcher.module.css';
import Switcher from './common/c8-Switcher/Switcher';

export const App = () => {
    const dispatch = useTypedDispatch()
    const isInitialised = useTypedSelector<boolean>(state => state.app.isInitialised)

    const [mode, setMode] = useState<boolean>(true)
    const onChangeThemeHandler = () => {
        return setMode(!mode)
    }

    let mainTheme = `${s.App} ${s.themeWhite}`;
    let imgLogo = 'https://img.icons8.com/small/100/000000/moon-symbol.png'

    if (mode) {
        mainTheme = `${s.App} ${s.themeDark}`
        imgLogo = 'https://img.icons8.com/ios/50/000000/sun--v1.png'
    }

    useEffect(()=>{
        dispatch(authoriseMeTC())
    }, [])
    if (!isInitialised) {
        return <Preloader/>
    }
    return (
        <div className={mainTheme}>
            <Main/>
            <Switcher onChangeThemeHandler={onChangeThemeHandler} src={imgLogo}/>
        </div>
    );
}

