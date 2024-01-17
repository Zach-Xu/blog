import React, { useCallback } from 'react'

interface Props {
    opacity?: 'high' | 'medium' | 'low'
}

const Wave = ({ opacity = 'high' }: Props) => {

    let opacityClassName;

    switch (opacity) {
        case 'high':
            opacityClassName = 'opacity-100'
            break
        case 'medium':
            opacityClassName = 'opacity-80'
            break
        case 'low':
            opacityClassName = 'opacity-60'
            break
        default:
            opacityClassName = 'opacity-0'
            break
    }





    return (
        <svg
            className={`absolute left-0 bottom-0 h-[10vh] md:h-[12vh] w-full min-h-[10vh] md:min-h-[3.125rem] max-h-[9.375rem] z-[1]  ${opacityClassName} `}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
        >
            {/* Shape container */}
            <defs>
                <path
                    id="gentle-wave"
                    d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                />
            </defs>
            {/* Combined waves */}
            <g className="parallax">
                <use className="animate-wave -animate-delay-2 animate-duration-7  fill-[#212121]" xlinkHref="#gentle-wave" x="48" y="0" />
                <use className="animate-wave -animate-delay-3 animate-duration-10 fill-[#202020]" xlinkHref="#gentle-wave" x="48" y="3" />
                <use className="animate-wave -animate-delay-4 animate-duration-13 fill-[#1f1f1f]" xlinkHref="#gentle-wave" x="48" y="5" />
                <use className="animate-wave -animate-delay-5 animate-duration-20 fill-[#21252b]" xlinkHref="#gentle-wave" x="48" y="7" />
            </g>
        </svg>
    )
}

export default Wave