import React, {useState} from 'react';
import {Modal} from "./Modal";

export const ModalContainer: React.FC = () => {

  const [show, setShow] = useState(false)
  return (
    <>
      <Modal
        show={show}
        modalOnClick={()=> {setShow(false)}}
        enableBackground={true}
        backgroundOnClick={() => setShow(false)}
      >

        modal
        <button onClick={()=> setShow(false)}>close </button>
      </Modal>
      <button onClick={()=>{setShow(true)}}> modal </button>
    </>
  );
};
