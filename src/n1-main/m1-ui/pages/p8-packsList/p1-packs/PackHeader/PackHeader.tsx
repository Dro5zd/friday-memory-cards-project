import React from 'react';
import s from './PackHeader.module.css';
import {DebounceSearch} from "../../../../common/c13-DebounceSearch/DebounceSearch";
import {setPackNameValue} from "../../../../../m2-bll/sortReducer";
import {useTypedDispatch} from "../../../../../m2-bll/store";
import {ModalContainer} from "../../../../common/c15-Modal/ModalContainer";

export const PackHeader = () => {
  const dispatch = useTypedDispatch()

  // const [packName, setPackName] = useState('')

  // const createPackButtonHandler = (data: CreatePackDataType) => {
  //   dispatch(changePacksCurrentPageAC(1))
  //   dispatch(postPacksTC(data))
  // }

  const debounceHandler = (text: string) => {
    dispatch(setPackNameValue(text))
    // setPackName(text)  // сетает для кнопки имя пака
  };

  return (
    <div>
      <div className={s.header}>
        <div className={s.searchContainer}>
          <DebounceSearch
            className={s.searchInput}
            delay={1000}
            callback={debounceHandler}/>
          <ModalContainer/>
        </div>
      </div>
    </div>
  );
};