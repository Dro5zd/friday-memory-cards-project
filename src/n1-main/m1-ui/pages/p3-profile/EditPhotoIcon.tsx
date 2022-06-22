import React, {useRef} from 'react';
import camera from "../../../../assets/img/camera-solid.svg";
import {InputFile} from "../../common/c1.1-InputFile/InputFile";


interface IProps {
  className: string;
  dispatchCallback: (avatar: string) => void
}

export const EditPhotoIcon: React.FC<IProps> = ({className, dispatchCallback}) => {

  const myRef = useRef<HTMLInputElement>(null)

  const onClick = () => {
    myRef.current && myRef.current.click()
  }

  return (
    <div onClick={onClick} className={className}>
      <img src={camera} alt="camera"/>
      <InputFile ref={myRef} fileType={".jpg, .jpeg, .png, .gif"} onChangeCallback={dispatchCallback}/>
    </div>
  );
};

