import React, {useState} from 'react';
import {updatePacksTC} from '../../../../../../m2-bll/cardPacksReducer';
import {useTypedDispatch, useTypedSelector} from '../../../../../../m2-bll/store';
import {ModalEdited} from '../../../../../common/c14-Modal/ModalEdited';
import SuperInputText from '../../../../../common/c1-SuperInputText/SuperInputText';
import SuperButton from '../../../../../common/c2-SuperButton/SuperButton';
import s from '../Modal.module.css';

interface IEditPackModal {
    closeModal: () => void;
    modalMode: boolean;
    packId: string
}

export const EditPackModal: React.FC<IEditPackModal> = ({
                                                            packId,
                                                            closeModal,
                                                            modalMode,
                                                        }) => {

    const dispatch = useTypedDispatch()
    const packs = useTypedSelector(state => state.packs)
    const [packName, setPackName] = useState<string>(packs.cardPacks.find((pack) => pack._id === packId)?.name || '')

    const updateHandler = () => {
        closeModal()
        dispatch(updatePacksTC(packId, packName))
    }

    return (
        <ModalEdited modalMode={modalMode} closeModal={closeModal}>
            <span className={s.title}>Update Pack Name</span>
            <SuperInputText
                className={s.packNameInput}
                placeholder={'New Pack Name'}
                value={packName}
                onChange={(e) => {
                    setPackName(e.currentTarget.value)
                }}
            />
            <div className={s.btnWrapper}>
                <SuperButton
                    className={s.saveButton}
                    title={'Update'}
                    onClick={updateHandler}
                    disabled={packName === ''}
                />
                <SuperButton
                    className={s.cancelButton}
                    title={'Cancel'}
                    onClick={closeModal}
                />
            </div>
        </ModalEdited>

    );
};