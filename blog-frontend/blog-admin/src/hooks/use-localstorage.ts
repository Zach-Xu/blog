import { Dispatch, useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, defaultValue?: T): [T | undefined, Dispatch<T>] => {

    const getValueFromLocalStorage = (): T | undefined => {
        const itemValue = localStorage.getItem(key)

        if (!itemValue) {
            return defaultValue
        }

        try {
            return JSON.parse(itemValue)
        } catch (error) {
            return itemValue as T
        }
    }

    const [value, setValue] = useState<T | undefined>(getValueFromLocalStorage)

    useEffect(() => {
        if (value) {
            localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
        }
    }, [key, value])

    return [value, setValue];
}