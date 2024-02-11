import React, { useState } from 'react'
import useSettingStore from '../../store/setting-store'
import { useMutation } from 'react-query'
import { authService } from '../../services/resources/auth-service'
import useUserStore from '../../store/user-store'

const LoginModal = () => {

    const isLoginModalShown = useSettingStore(state => state.isLoginModalShown)
    const isRegisterModalShown = useSettingStore(state => state.isRegisterModalShown)
    const toggleLoginModal = useSettingStore(state => state.toggleLoginModal)
    const toggleRegisterModal = useSettingStore(state => state.toggleRegisterModal)

    const updateUser = useUserStore(state => state.updateUser)

    const [email, setEmail] = useState('')
    const [password, setPassowrd] = useState('')

    const closeModal = (e: React.MouseEvent) => {
        // this line prevents side drawer from closing
        e.stopPropagation()

        if (!isLoginModalShown) {
            return
        }
        toggleLoginModal(false)
    }

    const openRegisterModal = () => {
        toggleLoginModal(false)
        toggleRegisterModal(true)
    }

    const { mutate, isLoading } = useMutation(['login', { email, password }], () => authService.login({ email, password }), {
        onSuccess: (result) => {
            updateUser(result)
            toggleLoginModal(false)
        }
    })

    const login = (event: React.FormEvent) => {
        event.preventDefault()
        mutate()
    }


    return (
        <div className={`${isLoginModalShown ? 'visible' : 'invisible'}  text-white bg-image-cover overflow-y-auto overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-[100vh]`}
            onClick={closeModal}
        >
            <div className={`${(isLoginModalShown || isRegisterModalShown) ? '' : '-translate-y-full'} transition-transform  ease-in duration-500 relative p-4 w-full max-w-md max-h-full bg-[#222] rounded-2xl shadow`}
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-end px-4 pt-2 md:px-5 md:pt-3 ">
                    <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gradient-pink hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                        onClick={closeModal}>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>

                <div className="px-4 pb-4 md:px-5 md:pb-5">
                    <form className="space-y-4" onSubmit={login}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium ">
                                Email
                            </label>
                            <input type="email" name="email" id="email"
                                className="bg-gray-50 placeholder:text-gray-900 focus:outline-none text-black text-sm rounded-lg  block w-full p-2.5 "
                                placeholder="name@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium ">
                                Password
                            </label>
                            <input type="password" name="password" id="password"
                                placeholder="••••••••"
                                className="bg-gray-50 placeholder:text-gray-900 focus:outline-none border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5"
                                value={password}
                                onChange={e => setPassowrd(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            {/* To be implemented */}
                            <a href="#" className="text-sm hover:underline ">Lost Password?</a>
                        </div>
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'} w-full bg-gradient-pink flex  items-center space-x-4  justify-center focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>
                            <span>
                                Login
                            </span>
                            {
                                isLoading &&
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            }
                        </button>
                        <div className="text-sm font-medium ">
                            Not registered?
                            <button type='button' className="hover:underline ml-2 text-blue-500 font-bold"
                                onClick={openRegisterModal}
                            >
                                Create an account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginModal