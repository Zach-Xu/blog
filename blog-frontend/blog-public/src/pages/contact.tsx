import React from 'react'
import Wave from '../layout/wave'
import { ChatBubbleOvalLeftEllipsisIcon, EnvelopeIcon, PaperAirplaneIcon, PhoneIcon, UserIcon } from '@heroicons/react/24/solid'
import MessageBox from '../components/contact/message-box'
import useUserStore from '../store/user-store'
import MessageList from '../components/contact/message-list'

const Contact = () => {

    const user = useUserStore(state => state.user)

    return (
        <div className='min-h-screen  relative caret-transparent'>
            <div className='h-[70vh] relative -z-20'>
                <div className='h-[70vh] fixed w-full bg-archive bg-image-cover bg-cover bg-no-repeat bg-center text-white flex flex-col space-y-4 justify-center items-center'>
                    <h2 className='font-bold text-4xl md:text-5xl '>
                        Contact
                    </h2>
                </div>
                <Wave opacity='medium' />
            </div>

            {/* Main Container */}
            <div className='bg-[#222] min-h-[30vh] relative z-10 p-4 text-gray-300'>
                <div className='shadow-around-hover rounded-lg p-6 md:p-8 lg:p-10 lg:w-[60.5rem] mx-auto'>
                    {/* Contact Section */}
                    <div >
                        <div className='flex items-center font-bold text-2xl md:text-3xl ml-4'>
                            Contact Info
                        </div>
                        <div className='mt-4 space-y-5 bg-[#322d31] rounded-md p-6 mx-4 border-l-4 border-l-pink-200'>
                            <div className='flex space-x-3'>
                                <UserIcon className='w-6 h-6 text-orange-400 animate-bounce' />
                                <p>Zach Xu</p>
                            </div>
                            <div className='flex  space-x-3'>
                                <PhoneIcon className='w-6 h-6 text-orange-400 animate-bounce' />
                                <p>+1 &#40;416&#41; 710-4222</p>
                            </div>
                            <div className='flex  space-x-3'>
                                <EnvelopeIcon className='w-6 h-6 text-orange-400 animate-bounce' />
                                <p>zxu71@my.centennialcollege.ca</p>
                            </div>
                        </div>
                    </div>
                    {/* Talk Section */}
                    <div className='mt-8'>
                        <div className='flex items-center font-bold text-2xl md:text-3xl ml-4'>
                            Lets' talk
                        </div>
                        <div className='mt-4 space-y-5 bg-[#322d31] rounded-md p-6 mx-4 border-l-4 border-l-pink-200'>
                            Please react out to me using the above contact, or kindly drop a message below. I will respond as soon as possible!
                        </div>
                    </div>
                    {/* Message */}
                    <div>
                        <div className='mx-4 mt-2'>
                            <p className='mb-2'>
                                <sub className='text-4xl text-red-600'>*</sub>
                                Your message will be visible to the public
                            </p>
                            {
                                !user &&
                                <div className='mt-4 space-y-5 bg-[#322d31] rounded-md p-6 border-l-4 border-l-pink-200 '>
                                    You will be assigned a random username if not logged in
                                </div>
                            }
                            <MessageBox rootCommentId={-1} />
                            <MessageList />
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Contact