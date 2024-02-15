import React, { forwardRef, useImperativeHandle, useState } from 'react'
import LazyLoadImage from '../home/featured-articles/lazy-load-image'
import Cropper, { Area } from 'react-easy-crop'
import { getCroppedImg, readFile } from '../../utils/cropper-utils'
import useUserStore from '../../store/user-store'



const UserAvatar = forwardRef<File, any>((props, ref) => {

    const avatar = useUserStore(state => state.user?.avatar)

    const [inputKey, setInputKey] = useState<string>('')
    const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
    const [croppedImage, setCroppedImage] = useState<[string, File] | null>(null)

    useImperativeHandle(ref, () => croppedImage ? croppedImage[1] : new File([''], 'init.jpg')
        , [croppedImage])

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            let imageDataUrl = await readFile(file)

            setImageSrc(imageDataUrl)
        }
    }

    const handleCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    const resetFileInput = () => {
        let randomString = Math.random().toString(36)
        setInputKey(randomString)
        setImageSrc(null)
    }

    const saveCroppedImage = async () => {
        if (!croppedAreaPixels) {
            return
        }

        try {
            const croppedImage = await getCroppedImg(
                imageSrc as string,
                croppedAreaPixels,
            )

            setCroppedImage(croppedImage)
            setImageSrc(null)
        } catch (e) {
            console.error(e)
        }
    }

    const resetAvatar = () => {
        resetFileInput()
        setCroppedImage(null)
    }


    return (
        <>
            <div className='flex flex-col items-center justify-center lg:justify-between lg:px-12'>
                <div className='flex-1 flex items-center'>
                    <div className='h-36 w-36 rounded-full overflow-hidden relative'>
                        <label htmlFor='avatarFile'>
                            <LazyLoadImage src={(croppedImage && croppedImage[0]) || (avatar || '/assets/default-user.jpg')} className='object-cover' />
                        </label>
                        <input type="file" key={inputKey} name="avatar" id='avatarFile' accept='.jpg, .png' multiple={false}
                            className='absolute bottom-0 left-0 w-full h-36 invisible'
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                {
                    croppedImage &&
                    <button className='bg-green-700 hover:bg-green-600 px-4 py-1 rounded-md text-white mt-6 lg:mt-0'
                        onClick={resetAvatar}
                    >
                        Reset Avatar
                    </button>
                }


            </div>

            {/* Cropper */}
            {
                imageSrc &&

                <div className={`visible  text-white bg-image-cover overflow-y-auto overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-[100vh]`}
                >
                    <div className='relative p-6 w-full max-w-md max-h-full bg-[#222] rounded-md '>
                        <div className={`relative h-[200px] w-full bg-white max-h-full `}>
                            <Cropper
                                image={imageSrc as string}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                onCropChange={setCrop}
                                onCropComplete={handleCropComplete}
                                onZoomChange={setZoom}
                            />
                        </div>
                        <div className='flex justify-end space-x-4 mt-4'>
                            <button className='bg-cyan-700 px-4 py-1 rounded-md'
                                onClick={saveCroppedImage}
                            >
                                Confirm
                            </button>
                            <button className='bg-red-700 px-4 py-1 rounded-md'
                                onClick={resetFileInput}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
})

export default UserAvatar