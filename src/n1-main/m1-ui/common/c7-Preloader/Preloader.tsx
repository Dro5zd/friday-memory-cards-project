import React from 'react';
// @ts-ignore
import preloader from '../../../../assets/img/Dual Ball-1.3s-108px.svg'
import s from './Preloader.module.css'
const Preloader = () => {
    return (
        <div className={s.preloader}>
            <img  src={preloader} alt={'gif'}/>
        </div>
    );
};

export default Preloader;