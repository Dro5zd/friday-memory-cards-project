import React from 'react';
import {usePagination} from './usePagination';
import s from './Pagination.module.css'
import angleLeft from '../../../../assets/img/angleLeft.png'
import angleRight from '../../../../assets/img/angleRight.png'

type PaginationType = {
    onPageChange: (p: number) => void;
    totalCount: number;
    siblingCount: number;
    currentPage: number;
    pageSize: number;
}

export const PaginationNew: React.FC<PaginationType> = ({
                                                            onPageChange,
                                                            totalCount,
                                                            siblingCount = 10,
                                                            currentPage,
                                                            pageSize,
                                                        }) => {

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

    // @ts-ignore
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        if (currentPage === lastPage) {
            return
        } else {
            onPageChange(currentPage + 1)
        }
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };
    // @ts-ignore
    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <div className={s.paginationContainer}>
            <ul className={s.paginationContainer}>
                <li
                    className={currentPage === 1 ? s.paginationItemDisabled : s.paginationItem}
                    onClick={onPrevious}
                >
                    <div className={s.angle}><img className={s.angle} src={angleLeft} alt="angleLeft"/></div>
                </li>
                {/*@ts-ignore*/}
                {paginationRange.map((pageNumber, index) => {
                    if (pageNumber === '...') {
                        return <li key={index} className={s.paginationItemDots}>&#8230;</li>;
                    }
                    return (
                        <li key={index}
                            className={pageNumber === currentPage ? s.paginationItemSelected : s.paginationItem}
                            // @ts-ignore
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </li>
                    );
                })}
                <li
                    className={currentPage === lastPage ? s.paginationItemDisabled : s.paginationItem}
                    onClick={onNext}
                >
                    <div className={s.angle}><img className={s.angle} src={angleRight} alt="angleRight"/></div>
                </li>
            </ul>
        </div>
    );
};