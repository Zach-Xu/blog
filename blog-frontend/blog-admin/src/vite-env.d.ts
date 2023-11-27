/// <reference types="vite/client" />

interface PageRequest {
    pageSize?: number
    pageNum?: number
}

interface PageRespsone<T> {
    rows: T[]
    totalPages: number
    total: number
}

interface ChangeStatusRequest {
    id: number
    enable: boolean
}
