import React, {useRef, useState} from 'react';
import s from './AttachFiles.module.css'
import {useModalHandler} from "../../../../../utils/use-modal-handler";
import clipIcon from "../../../../../../assets/img/paperclip-solid.svg";
import imageIcon from "../../../../../../assets/img/image-solid.svg";
import videoIcon from "../../../../../../assets/img/video-solid.svg";
import audioIcon from "../../../../../../assets/img/file-audio-solid.svg";
import {InputFile} from "../../../../common/c1.1-InputFile/InputFile";

export const AttachFiles = () => {

    const {modal: selected, toggleModal: toggleSelected} = useModalHandler()


    const attachRef = useRef<HTMLInputElement>(null)

    const [fileType, setFileType] = useState(".jpg, .jpeg, .png")

    const onChangeHandler = (value: string) => {
        toggleSelected()
    }

    const addVideoHandler = async () => {
        await setFileType('video/*')
        attachRef.current && attachRef.current.click()
    }
    const addAudioHandler = async () => {
        await setFileType('audio/*')
        attachRef.current && attachRef.current.click()
    }
    const addImageHandler = async () => {
        await setFileType('image/*')
        attachRef.current && attachRef.current.click()
    }

    const showHandler = () => {
        toggleSelected()
    }


    return (
        <div className={s.inputWrapper}>
            <InputFile fileType={fileType} onChangeCallback={onChangeHandler} ref={attachRef}/>
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
};

