import React from "react";
import s from './Rating.module.css'

export type RatingValueType = number

type RatingPropsType = {
  value: RatingValueType
}

export const MainRating = (props: RatingPropsType) => {

  return (
    <div>
      <Star selected={props.value > 0}  value={1}/>
      <Star selected={props.value > 1}  value={2}/>
      <Star selected={props.value > 2}  value={3}/>
      <Star selected={props.value > 3}  value={4}/>
      <Star selected={props.value > 4}  value={5}/>
    </div>
  )
};

type StarPropsType = {
  selected: boolean
  value: RatingValueType
}

function Star(props: StarPropsType) {
  return <span className={s.star}>{props.selected ? '★' : '☆'}</span>
}