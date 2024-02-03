import React from 'react'
import { useQuery } from 'react-query'
import { SocialIcon } from 'react-social-icons'
import { homeService } from '../../../services/resources/home-service'
import LazyLoadAvatar from './lazy-load-avatar'

const UserCard = () => {

    const { data: user } = useQuery('userCard', homeService.getSiteOwnerInfo)


    return (

        <div className='flex flex-col items-center py-4 space-y-4'>
            {
                user &&
                <>
                    <LazyLoadAvatar src="https://avatars.githubusercontent.com/u/111215609?v=4" alt="My avatar"
                        className='max-w-[10rem] mt-2 rounded-[50%] shadow-[0_0_1rem_0.625rem_#000] border-[0.0625rem] border-black
                 hover:animate-shake'
                    />
                    <p className='text-gray-300'>{user.username}</p>
                    <p className='text-gray-400' >Road to full stack developer</p>
                    {/* Article Stats */}
                    <div className='flex text-gray-300'>
                        <div >
                            <a href="" className='text-center'>
                                <div className='font-bold'>{user.articleCount}</div>
                                <div>Article</div>
                            </a>
                        </div>
                        <div className='border-x-[1px] px-4 mx-4'>
                            <a href="" className='text-center'>
                                <div className='font-bold'>{user.categoryCount}</div>
                                <div>Category</div>
                            </a>
                        </div>
                        <div>
                            <a href="" className='text-center'>
                                <div className='font-bold'>{user.tagCount}</div>
                                <div>Tag</div>
                            </a>
                        </div>
                    </div>
                    {/* Social Contacts */}
                    <div>
                        {
                            user.socials && user.socials.length > 0 &&
                            user.socials.map(social =>
                            (
                                social.url.startsWith("https://wa.me") ?
                                    <SocialIcon network='whatsapp' key={social.id} url={social.url} target='_blank' bgColor='transparent' fgColor='#aaa' style={{ width: '2.6rem' }} />
                                    :
                                    <SocialIcon key={social.id} url={social.url} target='_blank' bgColor='transparent' fgColor='#aaa' style={{ width: '2.6rem' }} />

                            ))
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default UserCard
