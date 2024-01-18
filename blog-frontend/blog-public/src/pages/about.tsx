import React from 'react'
import Wave from '../layout/wave'

const About = () => {
    return (
        <div className='min-h-screen bg-[#222]  relative caret-transparent'>
            <div className='h-[70vh] relative'>
                <div className='h-[70vh] fixed w-full bg-archive bg-cover bg-no-repeat bg-center  flex justify-center items-center'>
                    <h1 className=' bg-white px-6 py-2 opacity-90 rounded-lg font-bold text-xl '>
                        About
                    </h1>
                </div>
                <Wave opacity='medium' />
            </div>

            {/* Main Container */}
            <div className='relative bg-[#222] min-h-[30vh] z-10 p-4 text-gray-300'>
                <div className='shadow-around-hover rounded-lg p-6 md:p-8 lg:p-10 lg:w-[60.5rem] mx-auto flex flex-col'>
                    <div className='w-full flex justify-center items-center flex-wrap'>
                        <img src="https://avatars.githubusercontent.com/u/111215609?v=4" alt="My avatar"
                            className='max-w-[110px] mt-2 rounded-[50%] shadow-[0_0_1rem_0.625rem_#000] border-[0.0625rem] border-black
                 hover:animate-shake'
                        />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default About