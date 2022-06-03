import React from 'react'
import s from './EmailAnswer.module.css'
import mainLogo from "../../../../assets/img/B.A.D._logo3.png";
import mail from "../../../../assets/img/mail.png"
import {PATH} from "../../routes/Routs";
import {NavLink} from "react-router-dom";

export const EmailAnswer = () => {

  return (
    <div className={s.answerContainer}>
      <div className={s.components}>
        <div className={s.loginTitle}>
          <img src={mainLogo} alt="main_logo"/>
          {/*из-за того что полсе получения ссылки на почту открывается новая вкладка,
                для ввода нового пароля - эта линка отрабатывает не корректно
                по этому нужно будет перенаправлять на поле логинизации...
                пока оставлю так но потом нужно обратить внимание!!! */}
          <NavLink to={PATH.ENTERING_NEW_PASSWORD}
                   className={navData => navData.isActive ? s.active : s.link}>
            <div className={s.close}></div>
          </NavLink>
        </div>
        <div className={s.emailRound}>
          <img className={s.email} src={mail} alt="mail"/>
        </div>
        <span className={s.emailSubTitle}>Check Email</span>
        <span className={s.instructionsSpan}>We’ve sent an Email with instructions to You</span>
      </div>
    </div>
  )
}


