import React from 'react';
import s from './Modal.module.css'

interface ModalType {
  enableBackground?: boolean;
  backgroundOnClick?: () => void;
  modalOnClick?: () => void;
  show: boolean
  children: any
}

export const Modal: React.FC<ModalType> = ({
                                             modalOnClick,
                                             backgroundOnClick,
                                             enableBackground,
                                             show,
                                             children
                                           }) => {

  if (!show) return null;
  return (
    <div className={s.container}>
      {
        enableBackground && <div className={s.background}
                                 onClick={backgroundOnClick}></div>
      }
      <div className={s.components}
           onClick={modalOnClick}
      > {children}</div>
    </div>
  );
};

//
// import React, {CSSProperties} from 'react';
//
// interface IModal {
//   enableBackground?: boolean;
//   backgroundStyle?: CSSProperties;
//   backgroundOnClick?: () => void;
//
//   width: number;
//   height: number;
//   modalStyle?: CSSProperties;
//   modalOnClick?: () => void;
//
//   show: boolean
// }
//
// const Modal: React.FC<IModal> = (
//   {
//     enableBackground,
//     backgroundStyle,
//     backgroundOnClick = () => {},
//
//     width,
//     height,
//     modalStyle,
//     modalOnClick = () => {},
//
//     show,
//     // children,
//   }
// ) => {
//   const top = `calc(50vh - ${height / 2}px)`;
//   const left = `calc(50vw - ${width / 2}px)`;
//
//   if (!show) return null;
//
//   return (
//     <>
//       {enableBackground && <div
//           style={{
//             position: 'fixed',
//             top: '0px',
//             left: '0px',
//             width: '100vw',
//             height: '100vh',
//
//             background: 'black',
//             opacity: 0.35,
//             zIndex: 20,
//
//             ...backgroundStyle,
//           }}
//           onClick={backgroundOnClick}
//       />}
//       <div
//         style={{
//           position: 'fixed',
//           top,
//           left,
//           width,
//           height,
//           display: 'flex',
//           flexFlow: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//
//           background: 'lime',
//           zIndex: 21,
//
//           ...modalStyle,
//         }}
//         onClick={modalOnClick}
//       >
//         {/*{children}*/} ?????
//       </div>
//     </>
//   );
// };
//
// export default Modal;