import React from 'react'

const CommentCard = () => {
    return (
        <div className='flex items-center'>
            <img src="https://avatars.githubusercontent.com/u/111215609?v=4" alt="user avatar"
                className='w-[4.2rem] h-[4.2rem] rounded-xl'
            />
            <div className='w-[calc(100%-4.2rem)] h-[4.2rem] pl-[0.625rem] text-sm flex flex-col justify-between'>
                <div className='text-gray-300'>Setsuko</div>
                <div className='text-xs'>2023-12-26</div>
                <div className='line-clamp-1'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero molestias maxime doloribus nisi suscipit recusandae at voluptatibus. Neque nihil minima ducimus quidem nemo. Eos debitis culpa explicabo pariatur beatae temporibus!</div>
            </div>
        </div>
    )
}

export default CommentCard