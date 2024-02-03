import { ReactElement } from "react"

interface Menu {
    name: string
    path?: string
    icon: ReactElement
    children?: Menu[]
}