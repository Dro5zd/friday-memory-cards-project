import React from 'react';

type ServerErrorsType = {
    errors: string[];
}
export const ServerErrors: React.FC<ServerErrorsType> = ({errors}) => {
    return (
        <div>
            {errors.map((e) => {
                return (<div>{e}</div>)
            })}
        </div>
    );
};

export default ServerErrors;