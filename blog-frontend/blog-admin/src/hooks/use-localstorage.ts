import { Dispatch, useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, defaultValue?: T): [T, Dispatch<T>] => {
    const [value, setValue] = useState<T>(() => {
        const itemValue = localStorage.getItem(key)

        if (!itemValue) {
            return defaultValue
        }

        try {
            return JSON.parse(itemValue)
        } catch (error) {
            return itemValue;
        }
    })

    useEffect(() => {
        if (value) {
            localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
        }
    }, [key, value])

    return [value, setValue];
}