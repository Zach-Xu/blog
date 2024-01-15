import { CalendarDaysIcon, EyeDropperIcon, FlagIcon, TagIcon } from '@heroicons/react/24/outline'
import ArticleCard from '../components/article-card/article-card'


const Home = () => {
    return (
        <div className='min-h-screen caret-transparent'>
            <div className='h-screen flex bg-[#2b2b2b] justify-center items-center -z-10'>
                <h1 className='fixed text-[#f7f7f7] text-[3rem] '>Hello World </h1>
            </div>
            <div className='bg-[#222222] relative z-10'>
                <div className='flex'>
                    {/* 3/4 section */}
                    <div className='lg:w-[calc(100%-18.75rem)] space-y-5 mx-2'>
                        {/* Article Card */}
                        <ArticleCard reverse={false} />
                        <ArticleCard reverse={true} />
                        <ArticleCard reverse={false} />
                    </div>
                    {/* 1/4 section */}
                    <div className='w-[18rem] hidden lg:block bg-green-300 h-[300px] text-white'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis explicabo consequuntur maiores et vo
                        luptas enim similique. Magnam illum sequi ducimus.
                    </div>

                </div>
            </div>
        </div>
    )
}



export default Home