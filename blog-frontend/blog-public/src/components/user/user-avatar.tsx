import React from 'react'
import LazyLoadImage from '../home/featured-articles/lazy-load-image'

interface Props {
    avatar: string | null
}

const UserAvatar = ({ avatar }: Props) => {
    return (
        <div className='flex items-center justify-center lg:px-12'>
            <div className='h-36 w-36 rounded-full overflow-hidden relative'>
                <label htmlFor='avatarFile'>
                    <LazyLoadImage src={avatar || '/assets/default-user.jpg'} className='object-cover' />
                </label>
                <input type="file" name="avatar" id='avatarFile' accept='.jpg, .png' multiple={false}
                    className='absolute bottom-0 left-0 w-full h-36 invisible '
                />
            </div>
        </div>
    )
}

export default UserAvatar