import React, {useRef} from 'react';
import camera from "../../../../assets/img/camera-solid.svg";
import {InputFile} from "../../common/c1.1-InputFile/InputFile";

interface IProps {
    className: string;
}

export const EditPhotoIcon: React.FC<IProps> = ({className}) => {
    const myRef = useRef<HTMLInputElement>(null)
    const onChangeHandler = (value: string) => {
        console.log(value)
    }
    const onClick = () => {
        myRef.current && myRef.current.click()
    }
    return (
        <div onClick={onClick} className={className}>
            <img src={camera} alt="camera"/>
            <InputFile ref={myRef} fileType={".jpg, .jpeg, .png, .gif"} onChangeCallback={onChangeHandler}/>
        </div>
    );
};

