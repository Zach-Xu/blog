import React from 'react'
import { Link } from 'react-router-dom'
import { TagIcon } from '@heroicons/react/24/solid'

interface Props {
    tag: Tag
}

const Tag = ({ tag }: Props) => {
    return (
        <div key={tag.id} className='flex items-center bg-[#2d2e2f] py-1 px-2 text-xs md:text-sm space-x-2 text-blue-300 rounded-md hover:text-orange-600 cursor-pointer'>
            <TagIcon className='w-4' />
            <Link to={`/articles?tagId=${tag.id}`} state={{ tagName: tag.name }}>{tag.name}</Link>
        </div>
    )
}

export default Tag