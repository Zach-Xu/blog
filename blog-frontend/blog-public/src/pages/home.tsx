import UserCard from '../components/home/user-card/user-card'
import SiteStatsCard from '../components/home/site-stats-card/site-stats-card'
import NoticeCard from '../components/home/notice-card'

import LatestComments from '../components/home/latest-comment/latest-comment'
import Wave from '../layout/wave'
import FeaturedArticles from '../components/home/featured-articles/featured-articles'

const Home = () => {

    return (
        <div className='min-h-screen caret-transparent'>
            <div className='h-screen flex relative bg-[#2b2b2b] justify-center items-center z-[1]'>
                <h1 className='fixed text-[#f7f7f7] text-[3rem] '>Hello World </h1>
                <Wave />
            </div>
            {/* Main Container */}
            <div className='bg-[#222222] relative z-10 py-4'>
                <div className='flex xl:w-[72.5rem] mx-auto'>
                    {/* 3/4 section */}
                    <FeaturedArticles />
                    {/* 1/4 section */}
                    <div className='w-[18rem] hidden lg:flex flex-col text-white m-2 mr-4 space-y-4'>
                        {/* User Info */}
                        <div className='shadow-around-hover rounded-lg'>
                            <UserCard />
                        </div>
                        {/* Announcement */}
                        <NoticeCard />
                        {/* Latest Comments */}
                        <LatestComments />
                        {/* Site Stats */}
                        <SiteStatsCard />
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Home