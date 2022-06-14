import {useMemo} from 'react';

export type UsePaginationType = {
    totalCount: number
    siblingCount: number
    currentPage: number
    pageSize: number
}

export const usePagination = (props: UsePaginationType) => {

    return useMemo(() => {
        const totalPageCount = Math.ceil(props.totalCount / props.pageSize);

        // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
        const totalPageNumbers = props.siblingCount + 5;

        const range = (start: number, end: number) => {
            let length = end - start + 1;
            return Array.from({length}, (_, idx) => idx + start);
        };

        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }

        const leftSiblingIndex = Math.max(props.currentPage - props.siblingCount, 1);
        const rightSiblingIndex = Math.min(
            props.currentPage + props.siblingCount,
            totalPageCount
        );

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * props.siblingCount;
            let leftRange = range(1, leftItemCount);

            return [...leftRange, '...', totalPageCount];
        }

        /*
            Case 3: No right dots to show, but left dots to be shown
        */
        if (shouldShowLeftDots && !shouldShowRightDots) {

            let rightItemCount = 3 + 2 * props.siblingCount;
            let rightRange = range(
                totalPageCount - rightItemCount + 1,
                totalPageCount
            );
            return [firstPageIndex, '...', ...rightRange];
        }

        /*
            Case 4: Both left and right dots to be shown
        */
        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
        } return ['no pages']
    }, [props.totalCount, props.pageSize, props.siblingCount, props.currentPage]);
};