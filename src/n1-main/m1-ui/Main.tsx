import React from 'react';
import './App.module.css';
import {HashRouter} from 'react-router-dom';
import {Routs} from './routes/Routs';
import {Header} from './header/Header';

export const Main = () => {
    return (
        <div>
            <HashRouter>
                <Header/>
                <Routs/>
            </HashRouter>
        </div>
    );
}

