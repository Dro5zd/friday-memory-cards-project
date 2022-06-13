import React from 'react';
import preloader from '../../../../assets/img/Dual Ball-1.3s-108px.svg'
import s from './Preloader.module.css'

const Preloader = () => {
  return (
    <div className={s.preloaderWrapper}>
      <img className={s.preloader} src={preloader} alt={'gif'}/>
      <span>Stand with Ukraine!</span>
    </div>
  );
};

export default Preloader;