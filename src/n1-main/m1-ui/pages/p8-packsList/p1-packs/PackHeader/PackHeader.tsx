import React from 'react';
import s from './PackHeader.module.css';
import {DebounceSearch} from "../../../../common/c13-DebounceSearch/DebounceSearch";
import {setPackNameValue} from "../../../../../m2-bll/sortReducer";
import {useTypedDispatch} from '../../../../../m2-bll/store';
import SuperButton from '../../../../common/c2-SuperButton/SuperButton';


export const PackHeader: React.FC<PackHeaderType> = ({changeModelMode}) => {
  const dispatch = useTypedDispatch()

  const debounceHandler = (text: string) => {
    dispatch(setPackNameValue(text))
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
            onClick={changeModelMode}
            title={'ADD NEW PACK'}
            className={s.searchButton}
          />
        </div>
      </div>
    </div>
  );
};

// types
type PackHeaderType = {
  changeModelMode: () => void
}