import React from 'react'
import useSettingStore from '../../store/setting-store'

const LoginModal = () => {

    const isLoginModalShown = useSettingStore(state => state.isLoginModalShown)
    const isRegisterModalShown = useSettingStore(state => state.isRegisterModalShown)
    const toggleLoginModal = useSettingStore(state => state.toggleLoginModal)
    const toggleRegisterModal = useSettingStore(state => state.toggleRegisterModal)

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
                    <form className="space-y-4" action="#">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium ">
                                Email
                            </label>
                            <input type="email" name="email" id="email" className="bg-gray-50 placeholder:text-gray-900 focus:outline-none text-black text-sm rounded-lg  block w-full p-2.5 "
                                placeholder="name@example.com" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium ">
                                Password
                            </label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 placeholder:text-gray-900 focus:outline-none border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5" required />
                        </div>
                        <div className="flex justify-end">
                            <a href="#" className="text-sm hover:underline ">Lost Password?</a>
                        </div>
                        <button type="submit" className="w-full bg-gradient-pink  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Login
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