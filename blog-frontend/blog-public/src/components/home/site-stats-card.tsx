import { ChartBarIcon } from '@heroicons/react/24/outline'
import React from 'react'

const SiteStatsCard = () => {
    return (
        <div className='shadow-around-hover rounded-lg flex flex-col p-4 text-gray-400 space-y-2'>
            <div className='flex space-x-4 text-lg text-gray-300'>
                <ChartBarIcon className='w-5' />
                <h3>Site Statistic</h3>
            </div>
            <div className='flex justify-between'>
                <div>Article Numbers</div>
                <div>8</div>
            </div>
            <div className='flex justify-between'>
                <div>Uptime</div>
                <div>5 D 17 H 26 M 57 S</div>
            </div>
            <div className='flex justify-between'>
                <div>Visit Count</div>
                <div>217</div>
            </div>
        </div>
    )
}

export default SiteStatsCard