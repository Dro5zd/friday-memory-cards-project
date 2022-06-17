import React from 'react';
import s from './ServerErrors.module.css';

type ServerErrorsType = {
  errors: string[];
}
export const ServerErrors: React.FC<ServerErrorsType> = ({errors}) => {
  return (
    <div>
      {errors.map((e) => <div className={s.errorWrapper}><span>{e}</span></div>)}
    </div>
  );
};

export default ServerErrors;