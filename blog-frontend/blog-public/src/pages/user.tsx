import React, { useEffect, useRef, useState } from 'react'
import Wave from '../layout/wave'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authService } from '../services/resources/auth-service'
import UserAvatar from '../components/user/user-avatar'
import UserInfoForm from '../components/user/user-info-form'
import { userService } from '../services/resources/user-service'

const User = () => {

    const navigate = useNavigate()

    const croppedImgRef = useRef<File>(null)

    const { data: user, isFetched } = useQuery({
        queryKey: ['verifyToken'],
        queryFn: authService.verifyToken,
        enabled: false,
    })

    const queryClient = useQueryClient()

    useEffect(() => {
        if (!isFetched) {
            return
        }
        if (!user) {
            navigate('/')
        }
    }, [user, isFetched])

    const { mutate } = useMutation({
        mutationKey: ['updateUserInfo'],
        mutationFn: (data: UpdateUserInfoReq) => userService.updateUserInfo(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['verifyToken']
            })
        }
    })

    const updateUserInfo = (data: UpdateUserInfoReq) => {
        mutate({
            ...data,
            ...(croppedImgRef.current && croppedImgRef.current.name !== 'init.jpg' ? { avatarImage: croppedImgRef.current } : {})
        })
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
                            <UserAvatar ref={croppedImgRef} />
                            {/* User Info Form */}
                            <UserInfoForm onSubmit={updateUserInfo} isAvatarChanged={(croppedImgRef.current && croppedImgRef.current.name !== 'init.jpg') ? true : false} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default User