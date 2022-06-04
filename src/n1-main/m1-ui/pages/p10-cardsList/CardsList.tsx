import React from 'react'
import s from './cardsList.module.css'
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';

export const CardsList = () => {

  return (
    <div className={s.container}>
      <div className={s.components}>
        <div className={s.packListTitle}>
            CARDSLIST
          <SuperInputText/>
          <SuperInputText/>

        </div>
      </div>
    </div>
  )
}


