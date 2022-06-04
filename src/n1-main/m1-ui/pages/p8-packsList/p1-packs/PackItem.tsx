import React from 'react';
import s from './packItem.module.css';

export const PackItem = () => {
    return (
        <div>
            <div className={s.packItemContainer}>
                <div className={s.nameColumn}><span>Pack Name</span></div>
                <div className={s.cardsColumn}><span>27</span></div>
                <div className={s.updateColumn}><span>04.06.2022</span></div>
                <div className={s.nameColumn}>Lorenso Lamas</div>
                <div className={s.actionsColumn}>
                    <button>Delete</button>
                    <button>Edit</button>
                    <button>Learn</button>
                </div>
            </div>
        </div>
    );
};