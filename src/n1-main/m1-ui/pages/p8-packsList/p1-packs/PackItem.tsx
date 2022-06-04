import React from 'react';
import {useTypedDispatch} from "../../../../m2-bll/store";
import {cardPackTC} from "../../../../m2-bll/cardPacksReducer";

export const PackItem = () => {

  const dispatch = useTypedDispatch()

  const handler = () => {
    dispatch(cardPackTC())
  }

  return (
    <div>
      <div>
        <div><span>Pack Name</span></div>
        <div><span>27</span></div>
        <div><span>04.06.2022</span></div>
        <div>Lorenso Lamas</div>
        <div>
          <button onClick={handler}>Delete</button>
          <button>Edit</button>
          <button>Learn</button>
        </div>
      </div>
    </div>
  );
};