import React, {useEffect} from 'react';
import './App.css';
import {Main} from './Main';
import {useTypedDispatch, useTypedSelector} from "../m2-bll/store";
import {authoriseMeTC} from "../m2-bll/appReducer";
import Preloader from "./common/c7-Preloader/Preloader";

export const App = () => {
    const dispatch = useTypedDispatch()
    const isInitialised = useTypedSelector<boolean>(state => state.app.isInitialised)

    useEffect(()=>{
        dispatch(authoriseMeTC())
    }, [])
    if (!isInitialised) {
        return <Preloader/>
    }
    return (
        <div className="App">
            <Main/>
        </div>
    );
}

