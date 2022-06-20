import React, {ChangeEvent, useRef, useState,} from 'react'
import s from './InputFile.module.css'
import clipIcon from "../../../../assets/img/paperclip-solid.svg";
import imageIcon from "../../../../assets/img/image-solid.svg";
import videoIcon from "../../../../assets/img/video-solid.svg";
import audioIcon from "../../../../assets/img/file-audio-solid.svg";
import {useModalHandler} from '../../../utils/use-modal-handler';



export const InputFile = () => {

    const {modal: selected, toggleModal: toggleSelected} = useModalHandler()


    const myRef = useRef<HTMLInputElement>(null)

    const [fileType, setFileType]= useState(".jpg, .jpeg, .png")

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        toggleSelected()
    }

    const addVideoHandler = async () => {
        await setFileType('video/*')
        myRef.current && myRef.current.click()
    }
    const addAudioHandler = async () => {
        await setFileType('audio/*')
        myRef.current && myRef.current.click()
    }
    const addImageHandler = async () => {
        await setFileType('image/*')
        myRef.current && myRef.current.click()
    }

    const showHandler = () => {
        toggleSelected()
    }


    return (
        <div className={s.inputWrapper}>
            <input
                type={'file'}
                onChange={onChangeHandler}
                style={{display: 'none'}}
                ref={myRef}
                accept={fileType}
            />

            {
                !selected && <img className={s.iconControlClip} src={clipIcon} alt="passwordOn/Off"
                                  onMouseEnter={showHandler} onBlur={showHandler}/>
            }

            {selected &&
                <div className={s.iconsWrapper} onMouseLeave={showHandler}>
                    <img className={s.iconControlClip1} src={imageIcon} alt="passwordOn/Off"
                         onClick={addImageHandler}/>
                    <img className={s.iconControlClip1} src={videoIcon} alt="passwordOn/Off"
                         onClick={addVideoHandler}/>
                    <img className={s.iconControlClip1} src={audioIcon} alt="passwordOn/Off"
                         onClick={addAudioHandler}/>
                </div>
            }


        </div>
    )
}
