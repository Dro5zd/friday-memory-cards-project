// import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'
// import s from './SuperRange.module.css'
//
// // тип пропсов обычного инпута
// type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
//
// // здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// // (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
// type SuperRangePropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
//   onChangeRange?: (value: number) => void
//   value: number
//   max: number
//   min: number
//   styleClassNameRange?: React.CSSProperties | string
// };
//
// const SuperRange: React.FC<SuperRangePropsType> = (
//   {
//     type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
//     onChange, onChangeRange,
//     className,
//     value, max, min,
//     styleClassNameRange,
//     ...restProps// все остальные пропсы попадут в объект restProps
//   }
// ) => {
//   const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
//     onChange && onChange(e) // сохраняем старую функциональность
//
//     onChangeRange && onChangeRange(+e.currentTarget.value)
//   }
//
//   const finalRangeClassName = `${s.range} ${className ? className : ''}`
//
//   const finalRange = styleClassNameRange ? `${s.range} ${styleClassNameRange}` : s.range
//
//   return (
//     <div className={finalRange}>
//       <input
//         max={max}
//         value={value}
//         type={'range'}
//         onChange={onChangeCallback}
//         className={finalRangeClassName}
//         {...restProps}
//       />
//     </div>
//   )
// }
//
// export default SuperRange

import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import s from './SuperRange.module.css'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperRangePropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
  onChangeRange?: (value: number) => void
  value: number
  max: number
  min: number
  bgColor?: string
  styleClassNameRange?: React.CSSProperties | string // React.CSSProperties для объекта (st)
  styleProgressOverlay?: React.CSSProperties         // по аналогии с st
};

const SuperRange: React.FC<SuperRangePropsType> = (
  {
    type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
    onChange, onChangeRange,
    className,
    value, max, min,
    bgColor, styleClassNameRange, styleProgressOverlay,
    ...restProps// все остальные пропсы попадут в объект restProps
  }
) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e) // сохраняем старую функциональность

    onChangeRange && onChangeRange(+e.currentTarget.value)
  }

  const finalRangeClassName = `${s.range} ${className ? className : ''}`

  const pointPosition = value * 100 / max
  //--- заливка progress до ползунка
  const progressBGColor = bgColor ? bgColor : '#6d5dfc'
  //--- заливка progress до ползунка: дозаливка
  const restProgressBGColor = bgColor ? bgColor : 'olive'

  const selfPointPosition = (value * 26) / 100

  const finalRange = styleClassNameRange ? `${s.range} ${styleClassNameRange}` : s.range

  return (
    <div className={finalRange}>
            <span className={s.valueCoords}
                  style={{left: `calc(${pointPosition}% - ${selfPointPosition}px)`}}>{value}</span>
      <div className={s.progressOverlay} style={styleProgressOverlay}>
        <div className={s.progress} style={{
          zIndex: 'var(--zIndexProgress, 1)',
          background: `var(--bgProgress, ${progressBGColor})`,
          width: `${pointPosition}%`,
          boxShadow: `3px 0 0 0 ${restProgressBGColor}`
        }}/>
      </div>
        <div className={s.input}>
            <input
                step={1}
                max={max}
                value={value}
                type={'range'}
                onChange={onChangeCallback}
                className={finalRangeClassName}
                {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
            />
            <div className={s.innerRound}></div>
        </div>
    </div>
  )
}

export default SuperRange