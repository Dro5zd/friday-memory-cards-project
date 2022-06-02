import React from 'react';
import {useTypedDispatch, useTypedSelector} from "../../../m2-bll/store";
import {passwordToggleAC} from "../../../m2-bll/uiReducer";
import s from './EyeComponent.module.css'
import passViewOn from '../../../../assets/img/view.svg';
import passViewOff from '../../../../assets/img/no-view.svg';

export const EyeComponent = () => {

  const passOn = useTypedSelector(state => state.ui.passOn)
  const dispatch = useTypedDispatch()

  const changeView = () => {
    dispatch(passwordToggleAC(!passOn))
  }

  return (
    <div>
      <img
        className={s.passwordControl}
        src={passOn ? passViewOn : passViewOff}
        alt="passwordOn/Off"
        onClick={changeView}
      />
    </div>
  );
};