import React, {useRef, useState} from 'react';
import s from './AttachFiles.module.css'
import imageIcon from "../../../../../../assets/img/image-solid.svg";
import videoIcon from "../../../../../../assets/img/video-solid.svg";
import paperClip from "../../../../../../assets/img/paperclip-solid.svg";
import {InputFile} from "../../../../common/c1.1-InputFile/InputFile";

interface IAttachFiles {
  addPhoto: (photo: string) => void
  addVideo: (video: string) => void
}

export const AttachFiles: React.FC<IAttachFiles> = ({addPhoto, addVideo}) => {

  const [selected, setSelected] = useState(false)


  const videoRef = useRef<HTMLInputElement>(null)
  const imgRef = useRef<HTMLInputElement>(null)

  const onChangeVideoHandler = (value: string) => {
    addVideo(value)
  }

  const onChangeImgHandler = (value: string) => {
    addPhoto(value)
  }

  const addVideoHandler = () => {
    videoRef.current && videoRef.current.click()
  }

  const addImageHandler = () => {
    imgRef.current && imgRef.current.click()
  }

  const showIconsBlockHandler = () => {
    setSelected(true)
  }

  const closeIconBlockHandler = () => {
    setSelected(false)
  }

  return (
    <div className={s.inputWrapper}>
      <InputFile fileType={'video/*'} onChangeCallback={onChangeVideoHandler} ref={videoRef}/>
      <InputFile fileType={'image/*'} onChangeCallback={onChangeImgHandler} ref={imgRef}/>


      {
        !selected
          ? <img
            className={s.iconControlClip}
            src={paperClip}
            alt="paperClip"
            // onMouseEnter={showIconsBlockHandler}
            onClick={showIconsBlockHandler}
          />
          : <div className={s.iconsWrapper}>
            <div className={s.iconsBlock} onMouseLeave={closeIconBlockHandler}>
               <img className={s.iconControlClip1} src={imageIcon} alt="imageIcon"
                        onClick={addImageHandler}/>
              <img className={s.iconControlClip1} src={videoIcon} alt="videoIcon"
                   onClick={addVideoHandler}/>
            </div>
          </div>
      }

    </div>
  )
};

