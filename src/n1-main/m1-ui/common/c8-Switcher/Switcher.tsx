import React from 'react';
import sun from '../../../../assets/img/sun-60.png'
import s from './Switcher.module.css'
import {useTypedSelector} from '../../../m2-bll/store';

type SwitcherPropsType = {
    onChangeThemeHandler: ()=>void
}



const Switcher = (props: SwitcherPropsType) => {

    const mode = useTypedSelector(state => state.ui.mode)

    let imgLogo = 'https://img.icons8.com/small/100/000000/moon-symbol.png'

    if (mode) {
        imgLogo = 'https://img.icons8.com/ios/50/000000/sun--v1.png'
    }

    return (
        <div className={s.switcherBtn}>
            <img className={s.mainBtnIcon}
                 onClick={props.onChangeThemeHandler}
                 src={imgLogo}
                 alt={'logo'}/>
        </div>
    );
};

export default Switcher;