import React from 'react'
import s from './error404.module.css'
import png from '../../../../assets/img/png.png'

export const Error404 = () => {
    return (
        <div className={s.container}>
            <div className={s.png}>
                <img src={png} alt="cry" className={s.png2}/>
            </div>
            <div className={s.title1}>404</div>
            <div className={s.title2}>Page not found!</div>
        </div>
    )
}
