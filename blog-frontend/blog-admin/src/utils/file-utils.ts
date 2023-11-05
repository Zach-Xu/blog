import { toast } from "react-toastify";

export const getImgFileSrc = (file: File): string => {
    const reader = new FileReader();
    let src = '';

    reader.onloadend = () => {
        src = reader.result as string
    };

    reader.onerror = () => {
        console.error('There was an issue reading the file.');
    };

    reader.readAsDataURL(file);

    return src;
}

const supportFileTypes = ['image/png', 'image/jpeg']
const maxFileSize = 1 * 1024 * 1024

export const validateImage = (file: File): boolean => {

    if (!supportFileTypes.includes(file.type)) {
        toast.error('File is not an image')
        return false
    }

    if (file.size > maxFileSize) {
        toast.error('File size is too big')
        return false
    }

    return true
}