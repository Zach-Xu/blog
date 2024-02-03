import axios, { AxiosResponse } from 'axios'
import { errorCode } from './error-utils'
import { toast } from 'react-toastify'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

export const resourceAxios = axios.create({
    baseURL: 'http://localhost:8080/api'
})

const commonResponseInterceptor = (res: AxiosResponse) => {
    let code: string | number = (res.data.code as number || 200).toString()

    let message = res.data.message || errorCode[code] || errorCode['default']

    code = parseInt(code)

    // The response status code is defaulting to 200 
    // because we wrap the code and error message in a custom object
    // Therefore we should manully check the code and handle the error
    if (code !== 200 && code !== 201) {
        console.log('http status code is neither 200 nor 201')
        toast.error(message)
        return Promise.reject(new Error(message))
    }

    if (['post', 'put', 'delete'].includes(res.config.method || '')) {
        //   toast.success(message)
    }

    return res.data.data
}

// This error interceptor is used to handle errors caused by external factors, such as network issues, 
// and any exceptional cases that are not handled by the backend.
const commonErrorInterceptor = (error: any) => {
    let { message } = error
    if (message === 'Network Error') {
        message = 'Network error'
    } else if (message.includes('timeout')) {
        message = 'Request timeout'
    } else if (message.includes('Request failed with status code')) {
        message = 'Internal system error'
    }

    toast.error(message)
    return Promise.reject(new Error(message))
}

resourceAxios.interceptors.response.use(commonResponseInterceptor, commonErrorInterceptor)
