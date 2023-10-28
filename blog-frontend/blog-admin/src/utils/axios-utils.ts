import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { errorCode } from './error-code'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import { endLoading, onLoading } from '../redux/slices/loading-slice'
import { toast } from 'react-toastify';

let store: ToolkitStore

export const injectStore = (_store: ToolkitStore) => {
    store = _store
}

// axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

export const authAxios = axios.create({
    baseURL: 'http://localhost:8081/api/auth',
    // timeout: 10000
})

export const resourceAxios = axios.create({
    baseURL: 'http://localhost:8081/api',
    timeout: 10000
})

const commonRequestInterceptor = (config: InternalAxiosRequestConfig<any>) => {

    config.headers['Authorization'] = `Bearer ${localStorage.getItem('tk')}`

    store.dispatch(onLoading())
    return config
}

const commonResponseInterceptor = (res: AxiosResponse) => {

    let code: string | number = (res.data.code as number || 200).toString()

    let message = errorCode[code] || res.data.msg || errorCode['default']

    code = parseInt(code)

    if (code !== 200 && code !== 201) {
        toast.error(message)
    }

    store.dispatch(endLoading())

    return res.data.data

}

const commonErrorInterceptor = (error: any) => {
    console.log('err123' + error)
    let { message } = error
    if (message === 'Network Error') {
        message = 'Network error'
    } else if (message.includes('timeout')) {
        message = 'Request timeout'
    } else if (message.includes('Request failed with status code')) {
        message = 'Internal system error'
    }
    store.dispatch(endLoading())
    toast.error(message, {

    })
}

authAxios.interceptors.request.use(commonRequestInterceptor)
authAxios.interceptors.response.use(commonResponseInterceptor, commonErrorInterceptor)

resourceAxios.interceptors.request.use(commonRequestInterceptor)
resourceAxios.interceptors.response.use(commonResponseInterceptor, commonErrorInterceptor)
