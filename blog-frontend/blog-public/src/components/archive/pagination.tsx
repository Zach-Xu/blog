import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import React, { useMemo } from 'react'

/**
 * 
 * @param  total total number of pages
 * @param  cur  current page
 * @param  around number of pages to display around the current page
 */
const makePage = (total: number, cur: number, around: number) => {
    let result = [] // an arrray to store the generate page numbers
    let baseCount = around * 2 + 1 + 2 + 2 + 2; // the total number of elements in the pagination control, including page numbers and ellipsis 
    let surplus = baseCount - 4; // the number of elements available for displaying page numbers when ellipsis is present
    let startPosition = 1 + 2 + around + 1;// the index where ellipsis should start appearing at the beginning of the pagination control
    let endPosition = total - 2 - around - 1;// the index where ellipsis should start appearing at the end of the pagination control

    /**
     * If the total number of pages is less than or equal to the baseCount - 2, 
     * it means all pages can be displayed without the need for ellipsis. 
     * In this case, the function generates an array containing all page numbers
    */
    if (total <= baseCount - 2) {
        result = Array.from({ length: total }, (v, i) => i + 1);
    }
    // Ellipsis is needed
    else {
        /** 
         * If the current page is before the ellipsis threshold at the beginning, 
         * only ellipsis and the last few page numbers will be displayed.
         */
        if (cur < startPosition) {
            result = [...Array.from({ length: surplus }, (v, i) => i + 1), "...", total]

        }
        /** 
         * If the current page is after the ellipsis threshold at the end, 
         * only the first few page numbers and ellipsis will be displayed.
         */
        else if (cur > endPosition) {
            result = [1, '...', ...Array.from({ length: surplus }, (v, i) => total - surplus + i + 1)]
        }
        /**
         * If the current page is within the ellipsis thresholds, 
         * ellipsis will appear on both sides of the current page, 
         * and a subset of pages around the current page will be displayed.
         * 
         */
        else {
            result = [1, '...', ...Array.from({ length: around * 2 + 1 }, (v, i) => cur - around + i), '...', total]
        }
    }
    return result
}

interface Props {
    total: number
    current: number
    around?: number
}


const Pagination = ({ total, current, around = 0 }: Props) => {

    const pageElements = useMemo(() => makePage(total, current, around), [total, current, around])

    const getLastPage = () => {
        if (current - 1 <= 0) {
            return
        }
        // update curret and fetch data 
    }

    const getNextPage = () => {
        if (current + 1 > total) {
            return
        }
        // update curret and fetch data
    }

    return (
        <div className='flex justify-center  items-center text-gray-300'>
            {/* Pagination */}
            {/* Props total pages */}
            <div className='flex group'>
                <ChevronLeftIcon className='w-10 p-2 rounded-lg font-bold hover:bg-gradient-pink hover:text-black'
                    onClick={() => getLastPage()}
                />
                <div className='flex text-lg '>
                    {
                        pageElements.map((item, idx) => (
                            item === '...' ?
                                <div key={`${item}${idx}`} className='w-10 h-10 leading-10 rounded-lg text-center'>
                                    {item}
                                </div>
                                :
                                <div key={`${item}${idx}`} className={`${current === item ? 'bg-gradient-pink text-black group-hover:bg-none group-hover:text-gray-300 group-hover:hover:bg-gradient-pink group-hover:hover:text-black' : ''} w-10 h-10 leading-10 rounded-lg text-center hover:bg-gradient-pink hover:text-black`}>
                                    {item}
                                </div>
                        ))
                    }
                </div>
                <ChevronRightIcon className='w-10 p-2 rounded-lg font-bold hover:bg-gradient-pink hover:text-black'
                    onClick={() => getNextPage()}
                />
            </div>
        </div>
    )
}

export default Pagination