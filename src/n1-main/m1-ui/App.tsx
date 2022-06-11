import React, {useEffect} from 'react';
import {Main} from './Main';
import {useTypedDispatch, useTypedSelector} from "../m2-bll/store";
import {authoriseMeTC} from "../m2-bll/appReducer";
import Preloader from "./common/c7-Preloader/Preloader";
import s from './App.module.css';
import {ModalContainer} from "./common/c15-Modal/ModalContainer";

export const App = () => {
  const dispatch = useTypedDispatch()
  const isInitialised = useTypedSelector<boolean>(state => state.app.isInitialised)
  const mode = useTypedSelector(state => state.ui.mode)

  let mainTheme = `${s.App} ${s.themeWhite}`;

  if (!mode) {
    mainTheme = `${s.App} ${s.themeDark}`
  }

  useEffect(() => {
    dispatch(authoriseMeTC())
  }, [])

  if (!isInitialised) {
    return <Preloader/>
  }

  return (
    <div className={mainTheme}>
      <Main/>
      <ModalContainer/>
    </div>
  );
}

