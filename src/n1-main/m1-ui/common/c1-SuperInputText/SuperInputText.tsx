import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react'
import s from './SuperInputText.module.css'
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
    passOn?: boolean;
    setPassOn?: (value: boolean) => void;
    // onChange?: Dispatch<SetStateAction<string>>;
}

const SuperInputText = React.forwardRef<HTMLInputElement, SuperInputTextPropsType>((
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,
        passOn,
        setPassOn,
        ...restProps// все остальные пропсы попадут в объект restProps
    }, ref
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter // если есть пропс onEnter
        && e.key === 'Enter' // и если нажата кнопка Enter
        && onEnter() // то вызвать его
    }

    const changeView = () => {
        setPassOn && setPassOn(!passOn)
    }

    const finalInputClassName = `${s.input} ${error ? s.errorInput : s.superInput} ${className}`

    return (
        <div className={s.inputWrapper}>
            <input
                type={type}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={finalInputClassName}
                ref={ref}
                {...restProps}
            />

            {type === ('password') &&
                <img className={s.iconControl} src={passOn ? passViewOn : passViewOff} alt="passwordOn/Off"
                     onClick={changeView}/>}
            {type === ('text') &&
                <img className={s.iconControl} src={passOn ? passViewOn : passViewOff} alt="passwordOn/Off"
                     onClick={changeView}/>}

        </div>
    )
})

export default SuperInputText
