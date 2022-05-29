import React, {useEffect} from 'react';
import './App.css';
import {Main} from './Main';
import {profileAPI} from '../m3-dal/profile-api';

export const App = () => {
    useEffect(()=>{
        profileAPI.authMe({})
            .then()
    })
    return (
        <div className="App">
            <Main/>
        </div>
    );
}

