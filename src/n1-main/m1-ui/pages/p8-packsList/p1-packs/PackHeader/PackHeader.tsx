import React, {ChangeEvent, useState} from 'react';
import s from './PackHeader.module.css';
import {DebounceSearch} from "../../../../common/c13-DebounceSearch/DebounceSearch";
import {setPackNameValue} from "../../../../../m2-bll/sortReducer";
import {useTypedDispatch, useTypedSelector} from '../../../../../m2-bll/store';
import SuperButton from '../../../../common/c2-SuperButton/SuperButton';
import {changeModalModeAC} from '../../../../../m2-bll/uiReducer';
import SuperInputText from '../../../../common/c1-SuperInputText/SuperInputText';
import {Modal} from '../../../../common/c15-Modal/Modal';
import {CreatePackDataType} from '../../../../../m3-dal/cardPacks-api';
import {changePacksCurrentPageAC} from '../../../../../m2-bll/appReducer';
import {postPacksTC} from '../../../../../m2-bll/cardPacksReducer';

export const PackHeader = () => {
  const dispatch = useTypedDispatch()
  const modelMode = useTypedSelector(state => state.ui.modalMode)

  // const [packName, setPackName] = useState('')

  // const createPackButtonHandler = (data: CreatePackDataType) => {
  //   dispatch(changePacksCurrentPageAC(1))
  //   dispatch(postPacksTC(data))
  // }

  const [packName, setPackName] = useState('')

  const createPackButtonHandler = (data: CreatePackDataType) => {
    dispatch(changePacksCurrentPageAC(1))
    dispatch(postPacksTC(data))
    dispatch(changeModalModeAC(!modelMode))
  }

  const addPackHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPackName(e.currentTarget.value)
  }

  const debounceHandler = (text: string) => {
    dispatch(setPackNameValue(text))
    // setPackName(text)  // сетает для кнопки имя пака
  };

  const changeModelMode = () => {
    dispatch(changeModalModeAC(!modelMode))
  }

  return (
    <div>
      <Modal>
        <SuperInputText placeholder='Pack Name' onChange={addPackHandler} autoFocus/>
        <SuperButton
            value={packName}
            onClick={() => {createPackButtonHandler({cardsPack: {name: packName}})}}
            title={'CREATE PACK'}
            className={s.searchButton}
            // disabled={packName === ''}
        />
      </Modal>
      <div className={s.header}>
        <div className={s.searchContainer}>
          <DebounceSearch
            className={s.searchInput}
            delay={1000}
            callback={debounceHandler}/>
          <SuperButton
              onClick={changeModelMode}
              title={'ADD NEW PACK'}
              className={s.searchButton}
          />
        </div>
      </div>
    </div>
  );
};