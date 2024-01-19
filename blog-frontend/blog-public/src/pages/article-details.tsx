import React from 'react'
import Wave from '../layout/wave'

const ArticleDetails = () => {
  return (
    <div className='min-h-screen bg-[#222]  relative caret-transparent'>
      <div className='h-[70vh] relative'>
        <div className='h-[70vh] fixed w-full bg-archive bg-cover bg-no-repeat bg-center  flex justify-center items-center'>
          <h1 className=' bg-white px-6 py-2 opacity-90 rounded-lg font-bold text-xl '>
            Category
          </h1>
        </div>
        <Wave opacity='medium' />
      </div>

      {/* Main Container */}
      <div className='bg-[#222] relative z-10 p-4 text-gray-300'>
        <div className='shadow-around-hover rounded-lg p-6 md:p-8 lg:p-10 lg:w-[60.5rem] mx-auto flex flex-col'>
          {/* Category pie chart */}

        </div>
      </div>
    </div>

  )
}

export default ArticleDetails