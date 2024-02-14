import React from 'react'
import Wave from '../layout/wave'

import Markdown from '../components/markdown/markdown'
import { useQuery } from '@tanstack/react-query'
import { homeService } from '../services/resources/home-service'
import LazyLoadImage from '../components/home/featured-articles/lazy-load-image'

const About = () => {

    // const md = 'Aspire to be an ever-evolving full-stack developer, committed to continuous learning and growth in the dynamic realm of programming.\n\n```java\nSystem.out.println(\"Hello World\")\n```'

    const { data } = useQuery({
        queryKey: ['aboutMe'],
        queryFn: homeService.getAboutMe
    })

    return (
        <div className='min-h-screen  relative caret-transparent'>
            <div className='h-[70vh] relative -z-20'>
                <div className='h-[70vh] fixed w-full bg-archive bg-image-cover bg-cover bg-no-repeat bg-center text-white flex justify-center items-center'>
                    <h1 className='font-bold text-4xl md:text-5xl '>
                        About
                    </h1>
                </div>
                <Wave opacity='medium' />
            </div>

            {/* Main Container */}
            <div className='relative bg-[#222] min-h-[30vh] z-10 p-4 text-gray-300'>
                <div className='shadow-around-hover rounded-lg p-6 md:p-8 lg:p-10 lg:w-[60.5rem] mx-auto flex flex-col'>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <LazyLoadImage src={data?.avatar || "https://avatars.githubusercontent.com/u/111215609?v=4"} alt="My avatar"
                            className='max-w-[110px] mt-2 my-5 rounded-[50%] shadow-[0_0_1rem_0.625rem_#000] border-[0.0625rem] border-black
                 hover:animate-shake'
                        />
                        {/* Markdown Section */}
                        {
                            data &&
                            <Markdown content={data?.content}></Markdown>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default About