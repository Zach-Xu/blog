import React from 'react'
import Wave from '../../layout/wave'

const Loading = () => {
    return (
        <div className='min-h-screen relative caret-transparent'>
            <div className='h-[100vh] relative  -z-20 '>
                <div className='h-[100vh] fixed w-full -z-10 bg-archive bg-image-cover bg-cover bg-no-repeat bg-center flex flex-col text-white  justify-center items-center'>
                    <div aria-label="Loading..." role="status" className="flex items-center space-x-2 ">
                        <span className="text-4xl font-medium text-gray-300 inline-block animate-bounce">Loading...</span>
                    </div>
                </div>
                <Wave />
            </div>
        </div>
    )
}

export default Loading