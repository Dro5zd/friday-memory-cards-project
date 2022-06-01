import React from 'react'
import s from './packsList.module.css'
import mainLogo from '../../../../assets/img/B.A.D._logo3.png';

export const PacksList = () => {
  return (
    <div className={s.container}>
      <div className={s.components}>
        <div className={s.packListTitle}><img src={mainLogo} alt="main_logo"/></div>
      </div>
    </div>
  )
}


