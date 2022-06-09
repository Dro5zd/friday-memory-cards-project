import React from 'react';
import classnames from 'classnames';
import {usePagination} from './usePagination';
// import './pagination.scss';
import  s from './Pagination.module.css'
import angleLeft from '../../../../assets/img/angleLeft.png'
import angleRight from '../../../../assets/img/angleRight.png'


type PaginationType = {
    onPageChange: (p: number)=>void;
    totalCount: number;
    siblingCount: number;
    currentPage: number;
    pageSize: number;
}


export const PaginationNew: React.FC<PaginationType> =  ({onPageChange,
                                                   totalCount,
                                                   siblingCount = 1,
                                                   currentPage,
                                                   pageSize,
                                               })=> {

    const paginationRange = usePagination({currentPage,
        totalCount,
        siblingCount,
        pageSize}

    );



    // @ts-ignore
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };
    // @ts-ignore
    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <ul
            className={classnames(s.paginationContainer)}
        >
            {/* Left navigation arrow */}
            <li
                className={classnames(s.paginationContainer, {
                    disabled: currentPage === 1
                })}
                onClick={onPrevious}
            >
                <div className={s.angle}><img className={s.angle} src={angleLeft} alt="angleLeft"/></div>
            </li>
             {/*@ts-ignore*/}
            {paginationRange.map(pageNumber => {

                // If the pageItem is a DOT, render the DOTS unicode character
                if (pageNumber === '...') {
                    return <li className={s.paginationItemDots}>&#8230;</li>;
                }

                // Render our Page Pills
                return (
                    <li
                        className={classnames(s.paginationItem, {
                            selected: pageNumber === currentPage
                        })}
                        // @ts-ignore
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            {/*  Right Navigation arrow */}
            <li
                className={classnames(s.paginationItem, {
                    disabled: currentPage === lastPage
                })}
                onClick={onNext}
            >
                <div className={s.angle} ><img className={s.angle} src={angleRight} alt="angleRight"/></div>
            </li>
        </ul>
    );
};