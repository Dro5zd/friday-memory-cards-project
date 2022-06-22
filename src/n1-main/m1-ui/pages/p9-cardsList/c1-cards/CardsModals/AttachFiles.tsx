import React, {useRef} from 'react';
import s from './AttachFiles.module.css'
import imageIcon from "../../../../../../assets/img/image-solid.svg";
import videoIcon from "../../../../../../assets/img/video-solid.svg";
import audioIcon from "../../../../../../assets/img/file-audio-solid.svg";
import {InputFile} from "../../../../common/c1.1-InputFile/InputFile";

interface IAttachFiles {
    addPhoto: (photo: string) => void
}

export const AttachFiles:React.FC<IAttachFiles> = ({addPhoto}) => {

    // const {modal: selected, toggleModal: toggleSelected} = useModalHandler()


    const videoRef = useRef<HTMLInputElement>(null)
    const audioRef = useRef<HTMLInputElement>(null)
    const imgRef = useRef<HTMLInputElement>(null)

    const onChangeVideoHandler = (value: string) => {

    }

    const onChangeAudioHandler = (value: string) => {

    }

    const onChangeImgHandler = (value: string) => {
        addPhoto(value)
    }

    const addVideoHandler = () => {
        videoRef.current && videoRef.current.click()
    }
    const addAudioHandler =  () => {
        audioRef.current && audioRef.current.click()
    }
    const addImageHandler =  () => {
        imgRef.current && imgRef.current.click()
    }



    return (
        <div className={s.inputWrapper}>
            <InputFile fileType={'video/*'} onChangeCallback={onChangeVideoHandler} ref={videoRef}/>
            <InputFile fileType={'audio/*'} onChangeCallback={onChangeAudioHandler} ref={audioRef}/>
            <InputFile fileType={'image/*'} onChangeCallback={onChangeImgHandler} ref={imgRef}/>
            {/*{*/}
            {/*    !selected && <img className={s.iconControlClip} src={clipIcon} alt=""*/}
            {/*                      onClick={showHandler} onBlur={showHandler}/>*/}
            {/*}*/}


                <div className={s.iconsWrapper}>
                    <img className={s.iconControlClip1} src={imageIcon} alt="passwordOn/Off"
                         onClick={addImageHandler}/>
                    <img className={s.iconControlClip1} src={videoIcon} alt="passwordOn/Off"
                         onClick={addVideoHandler}/>
                    <img className={s.iconControlClip1} src={audioIcon} alt="passwordOn/Off"
                         onClick={addAudioHandler}/>
                </div>

        </div>
    )
};

