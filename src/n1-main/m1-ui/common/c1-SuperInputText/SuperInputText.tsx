import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent,} from 'react'
import s from './SuperInputText.module.css'
import {useTypedDispatch, useTypedSelector} from "../../../m2-bll/store";
import {passwordToggleAC} from "../../../m2-bll/uiReducer";
import passViewOn from "../../../../assets/img/view.svg";
import passViewOff from "../../../../assets/img/no-view.svg";

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: string
  spanClassName?: string;
  // onChange?: Dispatch<SetStateAction<string>>;
}

const SuperInputText = React.forwardRef<HTMLInputElement, SuperInputTextPropsType>((
  {
    type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
    onChange, onChangeText,
    onKeyPress, onEnter,
    error,
    className, spanClassName,

    ...restProps// все остальные пропсы попадут в объект restProps
  }, ref
) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange // если есть пропс onChange
    && onChange(e) // то передать ему е (поскольку onChange не обязателен)

    onChangeText && onChangeText(e.currentTarget.value)
  }
  const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyPress && onKeyPress(e);

    onEnter // если есть пропс onEnter
    && e.key === 'Enter' // и если нажата кнопка Enter
    && onEnter() // то вызвать его
  }

  const passOn = useTypedSelector(state => state.ui.passOn)
  const dispatch = useTypedDispatch()

  const changeView = () => {
    dispatch(passwordToggleAC(!passOn))
  }

  return (
    <div className={s.inputWrapper} >
      <input
        type={type}
        onChange={onChangeCallback}
        onKeyPress={onKeyPressCallback}
        className={s.superInput}
        ref={ref}

        {...restProps}
      />

      {type === ('password') && <img className={s.passwordControl} src={passOn ? passViewOn : passViewOff} alt="passwordOn/Off" onClick={changeView}/>}
      {type === ('text') && <img className={s.passwordControl} src={passOn ? passViewOn : passViewOff} alt="passwordOn/Off" onClick={changeView}/>}

    </div>
  )
})

export default SuperInputText
