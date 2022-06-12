import React, {ChangeEvent, useState} from 'react';
import {ModalAddPack} from "./ModalAddPack";
import s from "../../pages/p8-packsList/p1-packs/PackHeader/PackHeader.module.css";
import SuperButton from "../c2-SuperButton/SuperButton";
import {CreatePackDataType} from "../../../m3-dal/cardPacks-api";
import {changePacksCurrentPageAC} from "../../../m2-bll/appReducer";
import {postPacksTC} from "../../../m2-bll/cardPacksReducer";
import {useTypedDispatch} from "../../../m2-bll/store";
import SuperInputText from "../c1-SuperInputText/SuperInputText";

export const ModalContainer: React.FC = () => {
  const dispatch = useTypedDispatch()

  const [show, setShow] = useState(false)
  const [packName, setPackName] = useState('')

  const createPackButtonHandler = (data: CreatePackDataType) => {
    dispatch(changePacksCurrentPageAC(1))
    dispatch(postPacksTC(data))
    setPackName('')
  }

  const addPackHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPackName(e.currentTarget.value)
  }

  return (
    <>
      <SuperButton
        onClick={() => setShow(true)}
        title={'ADD NEW PACK'}
        className={s.searchButton}
      />
      <ModalAddPack
        show={show}
        modalOnClick={() => {
          setShow(!show)
        }}
        enableBackground={true}
        backgroundOnClick={() => setShow(false)}
      >
        <SuperInputText placeholder='Pack Name' onChange={addPackHandler} autoFocus/>
        <SuperButton
          value={packName}
          onClick={() => {
            setShow(!show);
            createPackButtonHandler({cardsPack: {name: packName}})
          }}
          title={'CREATE PACK'}
          className={s.searchButton}
          disabled={packName === ''}
        />
      </ModalAddPack>

    </>
  );
};
