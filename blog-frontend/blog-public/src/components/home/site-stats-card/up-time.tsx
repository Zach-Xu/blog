import React, { useEffect, useMemo, useState } from 'react'

interface Props {
    hostSince: string
}

/**
 * 
 * @param upTime time in second
 * @returns formatted uptime in string form
 */
const formatUptime = (upTime: number) => {
    const days = Math.floor(upTime / (24 * 3600));
    const hours = Math.floor((upTime % (24 * 3600)) / 3600);
    const minutes = Math.floor((upTime % 3600) / 60);
    const seconds = Math.floor(upTime % 60);

    return `${days} D ${hours} H ${minutes} M ${seconds} S`;
};

const UpTime = ({ hostSince }: Props) => {

    const [upTime, setUpTime] = useState(0)

    const hostTime = useMemo(() => new Date(hostSince).getTime(), [hostSince])


    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new Date().getTime()
            const upTime = (currentTime - hostTime) / 1000
            setUpTime(upTime)
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [hostSince])

    return (
        <div>{formatUptime(upTime)}</div>
    )
}

export default UpTime