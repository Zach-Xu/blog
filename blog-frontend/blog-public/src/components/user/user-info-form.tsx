import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import useUserStore from '../../store/user-store'

interface Props {
    isAvatarChanged: boolean
    onSubmit: (data: UpdateUserInfoReq) => void
}

const UserInfoForm = ({ onSubmit, isAvatarChanged = false }: Props) => {

    const user = useUserStore(state => state.user)

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')

    const updateUserInfo = (event: React.FormEvent) => {
        event.preventDefault()
        if (username === user?.username && !isAvatarChanged && password === '') {
            return
        }

        if (password !== confirmedPassword) {
            return toast.error('Passwords do not match')
        }
        onSubmit({
            username,
            password
        })
    }

    useEffect(() => {
        if (user) {
            setEmail(user.email || '')
            setUsername(user.username)
        }
    }, [user])


    return (
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
                <button type='submit' className='bg-cyan-700 px-4 py-1 rounded-md text-white hover:bg-cyan-600'>
                    Save Change
                </button>
            </div>
        </form>
    )
}

export default UserInfoForm