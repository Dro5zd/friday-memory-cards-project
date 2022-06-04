import React from 'react';
import s from './packItem.module.css';
import {useTypedDispatch} from "../../../../m2-bll/store";
import {cardPackTC} from "../../../../m2-bll/cardPacksReducer";

export const PackItem = () => {

  const dispatch = useTypedDispatch()

  const handler = () => {
    dispatch(cardPackTC())
  }
    return (
        <div>
            <div className={s.packItemContainer}>
                <div className={s.nameColumn}><span>Pack Name</span></div>
                <div className={s.cardsColumn}><span>27</span></div>
                <div className={s.updateColumn}><span>04.06.2022</span></div>
                <div className={s.nameColumn}>Lorenso Lamas</div>
                <div className={s.actionsColumn}>
                    <button  onClick={handler}>Delete</button>
                    <button>Edit</button>
                    <button>Learn</button>
                </div>
            </div>
        </div>
    );
};