import React from 'react'
import { ChartBarIcon } from '@heroicons/react/24/outline'
import { useQuery } from 'react-query'
import { homeService } from '../../../services/resources/home-service'
import UpTime from './up-time'

const SiteStatsCard = () => {

    const { data: site } = useQuery('site-stats', homeService.getSiteStats)

    return (
        <div className='shadow-around-hover rounded-lg flex flex-col p-4 text-gray-400 space-y-2'>
            {
                site &&
                <>
                    <div className='flex space-x-4 text-lg text-gray-300'>
                        <ChartBarIcon className='w-5' />
                        <h3>Site Statistic</h3>
                    </div>
                    <div className='flex justify-between'>
                        <div>Article Numbers</div>
                        <div>{site.articleCount}</div>
                    </div>
                    <div className='flex justify-between'>
                        <div>Uptime</div>
                        <UpTime hostSince={site.hostSince} />
                    </div>
                    <div className='flex justify-between'>
                        <div>Visit Count</div>
                        <div>{site.visitCount}</div>
                    </div>
                </>
            }
        </div>
    )
}

export default SiteStatsCard