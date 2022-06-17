import React from 'react';
import {usePagination} from './usePagination';
import s from './Pagination.module.css'
import angleLeft from '../../../../assets/img/angleLeft.svg'
import angleRight from '../../../../assets/img/angleRight.svg'
import SuperSelect from '../c5-SuperSelect/SuperSelect';


type PaginationType = {
    onPageChange: (p: number) => void;
    onChangePortions: (portion: number) => void;
    totalCount: number;
    siblingCount: number;
    currentPage: number;
    pageSize: number;
    title: string
}

export const Pagination: React.FC<PaginationType> = ({
                                                         onPageChange,
                                                         totalCount,
                                                         siblingCount = 10,
                                                         currentPage,
                                                         pageSize,
                                                         title,
                                                         onChangePortions
                                                     }) => {

    const options = [10, 20, 50, 100];

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

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

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <div>
            <div className={s.paginationContainer}>
                <ul className={s.paginationContainer}>
                    <li
                        className={currentPage === 1 ? s.paginationItemDisabled : s.paginationItem}
                        onClick={onPrevious}
                    >
                        <div className={s.angle}><img className={s.angle} src={angleLeft} alt="angleLeft"/></div>
                    </li>

                    {paginationRange.map((pageNumber, index) => {
                        if (pageNumber === '...') {
                            return <li key={index} className={s.paginationItemDots}>&#8230;</li>;
                        }
                        return (
                            <li key={index}
                                className={pageNumber === currentPage ? s.paginationItemSelected : s.paginationItem}
                                onClick={() => onPageChange(+pageNumber)}
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
                <div className={s.selectWrapper}>
                    <SuperSelect className={s.select} options={options} onChangeOption={onChangePortions}/>
                    <span>{title} per page</span>
                </div>
            </div>

        </div>

    );
};