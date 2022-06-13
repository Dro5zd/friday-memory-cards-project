import React, {useEffect, useState} from 'react';
import s from './Pagination.module.css';
import angleLeft from '../../../../assets/img/angleLeft.svg'
import angleRight from '../../../../assets/img/angleRight.svg'

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
            {portionNumber > 1 && <div onClick={changeToPreviousPage}><img className={s.angle} src={angleLeft} alt="angleLeft"/></div>}
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
            {portionCount > portionNumber && <div onClick={changeToNextPage}><img className={s.angle} src={angleRight} alt="angleRight"/></div>}
        </div>
    );
};
