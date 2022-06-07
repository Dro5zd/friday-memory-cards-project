import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import SuperInputText from "../c1-SuperInputText/SuperInputText";
import {useDebounce} from "./useDebounce";

interface IDebounceSearch {
    callback: (value: string) => void;
    delay: number;
    className?: string;
}

export const DebounceSearch: React.FC<IDebounceSearch> = React.memo(({callback, delay, className}) => {
    const [searchValue, setSearchValue] = useState<string>('')
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }, []);
    const debouncedSearchValue: string = useDebounce<string>(searchValue, delay);
    useEffect(() => {
        if (debouncedSearchValue) {
            callback(debouncedSearchValue)
        }
    }, [debouncedSearchValue])

    return (
        <div>
            <SuperInputText placeholder={'Search...'} className={className} onChange={onChangeHandler}/>
        </div>
    );
});

