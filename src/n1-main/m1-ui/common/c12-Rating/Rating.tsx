import React from "react";
import s from './Rating.module.css'

export type RatingValueType = number

type RatingPropsType = {
  value: RatingValueType
  addRating: (value: RatingValueType) => void
}

export const MainRating = (props: RatingPropsType) => {

  return (
    <div>
      <Star selected={props.value > 0} onClick={props.addRating} value={1}/>
      <Star selected={props.value > 1} onClick={props.addRating} value={2}/>
      <Star selected={props.value > 2} onClick={props.addRating} value={3}/>
      <Star selected={props.value > 3} onClick={props.addRating} value={4}/>
      <Star selected={props.value > 4} onClick={props.addRating} value={5}/>
    </div>
  )
};

type StarPropsType = {
  selected: boolean
  onClick: (value: RatingValueType) => void
  value: RatingValueType
}

function Star(props: StarPropsType) {

  function onClickSpanHandler () {
    props.onClick(props.value)
  }
  return <span className={s.star} onClick={onClickSpanHandler}>{props.selected ? '★' : '☆'}</span>
}