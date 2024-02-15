import { Area } from "react-easy-crop"

export const readFile = (file: File) => {
    return new Promise<string | ArrayBuffer | null>((resolve) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => resolve(reader.result), false)
        reader.readAsDataURL(file)
    })
}

const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image()
        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', (error) => reject(error))
        image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
        image.src = url
    })


export const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: Area,
    flip = { horizontal: false, vertical: false }
) => {
    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
        return null
    }

    // set canvas size to match the bounding box
    canvas.width = image.width
    canvas.height = image.height

    // translate canvas context to a central location to allow rotating and flipping around the center
    ctx.translate(image.width / 2, image.height / 2)

    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
    ctx.translate(-image.width / 2, -image.height / 2)

    // draw rotated image
    ctx.drawImage(image, 0, 0)

    const croppedCanvas = document.createElement('canvas')

    const croppedCtx = croppedCanvas.getContext('2d')

    if (!croppedCtx) {
        return null
    }

    // Set the size of the cropped canvas
    croppedCanvas.width = pixelCrop.width
    croppedCanvas.height = pixelCrop.height

    // Draw the cropped image onto the new canvas
    croppedCtx.drawImage(
        canvas,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    )

    // As Base64 string
    // return croppedCanvas.toDataURL('image/jpeg');

    // As a blob
    return new Promise<[string, File]>((resolve, reject) => {
        croppedCanvas.toBlob((blob) => {
            const avatarImage = new File([blob!], 'avatar.jpg', {
                type: 'image/jpeg'
            })
            resolve([URL.createObjectURL(blob!), avatarImage])
        }, 'image/jpeg')
    })
}