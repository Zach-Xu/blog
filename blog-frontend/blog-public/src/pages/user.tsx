import React, { useEffect, useState } from 'react'
import Wave from '../layout/wave'
import LazyLoadImage from '../components/home/featured-articles/lazy-load-image'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { authService } from '../services/resources/auth-service'
import UserAvatar from '../components/user/user-avatar'

const User = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState<string | null>('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')

    const navigate = useNavigate()

    const { data: user, isFetched } = useQuery({
        queryKey: ['verifyToken'],
        queryFn: authService.verifyToken,
        enabled: false,
    })


    useEffect(() => {
        if (!isFetched) {
            return
        }
        if (!user) {
            navigate('/')
        } else {
            setUsername(user.username)
            setEmail(user.email || '')
            setAvatar(user.avatar || null)
        }
    }, [user, isFetched])

    const updateUserInfo = (event: React.FormEvent) => {
        event.preventDefault()
    }

    return (
        <div className='min-h-screen  relative'>
            <div className='h-[70vh] relative -z-20  caret-transparent'>
                <div className='h-[70vh] fixed w-full bg-archive bg-image-cover bg-cover bg-no-repeat bg-center text-white flex justify-center items-center'>
                    <h1 className='font-bold text-4xl md:text-5xl '>
                        User Info
                    </h1>
                </div>
                <Wave opacity='medium' />
            </div>

            {/* Main Container */}
            <div className='relative bg-[#222] min-h-[30vh] z-10 p-4 text-gray-300'>
                <div className='shadow-around-hover rounded-lg p-6 md:p-8 lg:p-10 lg:w-[60.5rem] mx-auto flex flex-col'>
                    <div className='w-full flex flex-col'>
                        <h6>Basic Info</h6>
                        <div className='flex flex-col lg:flex-row'>
                            {/* User Avatar */}
                            <UserAvatar avatar={avatar} />
                            {/* User Info Form */}
                            <form className='flex-1 space-y-4' onSubmit={updateUserInfo}>
                                <div>
                                    <label htmlFor="username" className="block mb-1 text-sm font-medium">
                                        Username
                                    </label>
                                    <input type="text" name="username" id="username"
                                        className="bg-gray-50 placeholder:text-gray-900 focus:outline-none text-black text-sm rounded-lg  block w-full p-2.5 "
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div >
                                    <label htmlFor="email" className="block mb-1 text-sm font-medium">
                                        Email
                                    </label>
                                    <input type="email" name="email" id="email"
                                        className="bg-gray-50 cursor-not-allowed placeholder:text-gray-900 focus:outline-none text-black text-sm rounded-lg  block w-full p-2.5 "
                                        value={email}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password3" className="block mb-1 text-sm font-medium ">
                                        Password
                                    </label>
                                    <input type="password" name="password3" id="password3"
                                        minLength={password.trim() === '' ? undefined : 6}
                                        placeholder="Leave it empty if you don't want to change password"
                                        className="bg-gray-50 placeholder:text-gray-700  focus:outline-none border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required={password.trim() !== ''}
                                    />
                                </div>
                                <div className={password.trim() === '' ? 'invisible' : 'visible'}>
                                    <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium ">
                                        Confirm password
                                    </label>
                                    <input type="password" name="confirmPassword" id="confirmPassword"
                                        minLength={6}
                                        placeholder="Leave it empty if you don't want to change password"
                                        className="bg-gray-50 placeholder:text-gray-700  focus:outline-none border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5"
                                        value={confirmedPassword}
                                        onChange={e => setConfirmedPassword(e.target.value)}
                                        required={password.trim() !== ''}
                                    />
                                </div>
                                <div>
                                    <button type='submit' className='bg-cyan-600 px-4 py-1 rounded-md text-white'>
                                        Save change
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default User