import React, {useState} from 'react';
import s from './PackHeader.module.css';
import {DebounceSearch} from "../../../../common/c13-DebounceSearch/DebounceSearch";
import SuperButton from "../../../../common/c2-SuperButton/SuperButton";
import {setPackNameValue} from "../../../../../m2-bll/sortReducer";
import {CreatePackDataType} from "../../../../../m3-dal/cardPacks-api";
import {changePacksCurrentPageAC} from "../../../../../m2-bll/appReducer";
import {postPacksTC} from "../../../../../m2-bll/cardPacksReducer";
import {useTypedDispatch} from "../../../../../m2-bll/store";

export const PackHeader = () => {
  const dispatch = useTypedDispatch()
  const [packName, setPackName] = useState('')

  const createPackButtonHandler = (data: CreatePackDataType) => {
    dispatch(changePacksCurrentPageAC(1))
    dispatch(postPacksTC(data))
  }

  const debounceHandler = (text: string) => {
    dispatch(setPackNameValue(text))
    setPackName(text)
    // urlCardsPackId && dispatch(getCardsTC(urlCardsPackId))
  };

  return (
    <div>
      <div className={s.header}>
        <div className={s.searchContainer}>
          <DebounceSearch
            className={s.searchInput}
            delay={1000}
            callback={debounceHandler}/>
          <SuperButton
            value={packName}
            onClick={() => createPackButtonHandler({cardsPack: {name: packName}})}
            title={'ADD NEW PACK'}
            className={s.searchButton}
            disabled={packName === ''}
          />
        </div>
      </div>
    </div>
  );
};