import React from 'react';

import s from './Switcher.module.css'

type SwitcherPropsType = {
    onChangeThemeHandler: ()=>void
    src: string
}

const Switcher = (props: SwitcherPropsType) => {

    return (
        <div className={s.switcherBtn}>
            <img className={s.mainBtnIcon}
                 onClick={props.onChangeThemeHandler}
                 src={props.src}
                 alt={'logo'}/>
        </div>
    );
};

export default Switcher;