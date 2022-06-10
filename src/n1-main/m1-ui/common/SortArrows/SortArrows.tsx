import React from 'react';
import sortUpBlack from "../../../../assets/img/sortUpBlack.png";
import sortDownBlack from "../../../../assets/img/sortDownBlack.png";
import sortUpWhite from "../../../../assets/img/sortUpWhite.png";
import sortDownWhite from "../../../../assets/img/sortDownWhite.png";
import {useTypedSelector} from "../../../m2-bll/store";
import s from './SortArrows.module.css'

export const SortArrows = () => {

  const mode = useTypedSelector(state => state.ui.mode)
  const sortPacks = useTypedSelector(state => state.sort.sortPacks)
  const sortCards = useTypedSelector<string>(state => state.sort.sortCards)


  const typesOfPacksValues = '0name' || '0cardsCount' || '0updated' || '0user_name'
  const typesOfCardsValues =  '0question' || '0answer' || '0updated' ||  '0grade'



  const isUpPacks = (sortPacks === typesOfPacksValues)
  const isUpCards = (sortCards === typesOfCardsValues)


  const arrowBlackImgCards = isUpCards ? sortUpBlack : sortDownBlack
  const arrowWhiteImgCards = isUpCards ? sortUpWhite : sortDownWhite


  const arrowBlackImgPacks = isUpPacks ? sortUpBlack : sortDownBlack
  const arrowWhiteImgPacks = isUpPacks ? sortUpWhite : sortDownWhite

  const arrowPacks = mode ? (arrowBlackImgPacks) : (arrowWhiteImgPacks)
  const arrowCards = mode ? (arrowBlackImgCards) : (arrowWhiteImgCards)

  return (
    <div className={s.sortUp}>
      <img src={arrowPacks || arrowCards} alt=""/>
    </div>
  );
};