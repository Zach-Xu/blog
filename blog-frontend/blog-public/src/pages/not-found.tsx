import React from 'react'
import Wave from '../layout/wave'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="h-screen relative caret-transparent flex items-center p-16 bg-[#2b2b2b] text-gray-300">
            <div className="flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
                        <span className="sr-only">Error</span>404
                    </h2>
                    <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
                    <Link to={'/'} className="block mt-4 font-semibold rounded text-gray-400 hover:text-gray-300">Back to homepage</Link>
                </div>
            </div>
            <Wave />
        </div>
    )
}

export default NotFound