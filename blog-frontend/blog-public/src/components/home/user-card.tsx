import React from 'react'
import { SocialIcon } from 'react-social-icons'

const UserCard = () => {
    return (
        <div className='flex flex-col items-center py-4 space-y-4'>
            <img src="https://avatars.githubusercontent.com/u/111215609?v=4" alt="My avatar"
                className='max-w-[10rem] mt-2 rounded-[50%] shadow-[0_0_1rem_0.625rem_#000] border-[0.0625rem] border-black
                 hover:animate-shake'
            />
            <p className='text-gray-300'>Zach</p>
            <p className='text-gray-400' >Road to full stack developer</p>
            {/* Article Stats */}
            <div className='flex text-gray-300'>
                <div >
                    <a href="" className='text-center'>
                        <div className='font-bold'>4</div>
                        <div>Article</div>
                    </a>
                </div>
                <div className='border-x-[1px] px-4 mx-4'>
                    <a href="" className='text-center'>
                        <div className='font-bold'>3</div>
                        <div>Category</div>
                    </a>
                </div>
                <div>
                    <a href="" className='text-center'>
                        <div className='font-bold'>5</div>
                        <div>Tag</div>
                    </a>
                </div>
            </div>
            {/* Social Contacts */}
            <div>
                <SocialIcon url='https://github.com/Zach-Xu' target='_blank' bgColor='transparent' fgColor='#aaa' style={{ width: '2.6rem' }} />
                <SocialIcon url='https://www.linkedin.com/in/zach-xu-b45293262/' bgColor='transparent' fgColor='#aaa' style={{ width: '2.6rem' }} target='_blank' />
                <SocialIcon network='whatsapp' url='https://wa.me/14167104222' bgColor='transparent' fgColor='#aaa' style={{ width: '2.6rem' }} target='_blank' />
            </div>
        </div>
    )
}

export default UserCard
