import React from 'react';
import s from './cardItem.module.css';

export const CardItem = () => {
  return (
    <div>
      <div className={s.cardItemContainer}>
        <div className={s.nameColumn}>Where the russian ship was sent?</div>
        <div className={s.nameColumn}>russian ship was sent to...</div>
        <div className={s.updateColumn}>04.06.2022</div>
        <div className={s.actionsColumn}>☆☆☆☆☆</div>
      </div>
    </div>
  );
};