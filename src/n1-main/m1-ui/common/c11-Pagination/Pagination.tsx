import React, {useEffect, useState} from 'react';
import s from './Pagination.module.css';

interface IPagination {
    totalItemsCount: number;
    pageSize: number;
    currentPage: number;
    onPageChanged: (p: number) => void;
    portionSize?: number;
}

export const Pagination: React.FC<IPagination> = ({
                                                      totalItemsCount,
                                                      currentPage,
                                                      onPageChanged,
                                                      pageSize,
                                                      portionSize = 10,
                                                  }) => {
    useEffect(() => setPortionNumber(Math.ceil(currentPage / portionSize)), [currentPage, portionSize]);
    const pagesCount = Math.ceil(totalItemsCount / pageSize);
    const pages: number[] = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    const portionCount = Math.ceil(pagesCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionNumber = portionNumber * portionSize;
    const changeToPreviousPage = () => {
        setPortionNumber(portionNumber - 1);
    };
    const changeToNextPage = () => {
        setPortionNumber(portionNumber + 1);
    };

    return (
        <div className={s.paginationContainer}>
            {portionNumber > 1 && <button onClick={changeToPreviousPage}>⇦</button>}
            {pages
                .filter((p) => p >= leftPortionNumber && p <= rightPortionNumber)
                .map((p) => {
                    return (
                        <div
                            className={p ===currentPage ? s.currentPage : s.paginationItem}
                            key={Math.random()}
                            onClick={() => {
                                onPageChanged(p);
                            }}
                        >
                            {p}
                        </div>
                    );
                })}
            {portionCount > portionNumber && <button onClick={changeToNextPage}>⇨</button>}
        </div>
    );
};
