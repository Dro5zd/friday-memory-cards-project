import React from 'react';
import s from './Switcher.module.css'
import {useTypedSelector} from '../../../m2-bll/store';
import sun from '../../../../assets/img/sun.svg'
import moon from '../../../../assets/img/moon.svg'

type SwitcherPropsType = {
  onChangeThemeHandler: () => void
}

export const Switcher = (props: SwitcherPropsType) => {

  const mode = useTypedSelector(state => state.ui.mode)

  return (
    <div className={s.switcherBtn} onClick={props.onChangeThemeHandler}>
      <img
        className={s.mainBtnIcon}
        src={mode ? sun : moon}
        alt={'logo'}
      />
      <span>{mode ? 'Day ' : 'Night ' }mode</span>
    </div>
  );
};