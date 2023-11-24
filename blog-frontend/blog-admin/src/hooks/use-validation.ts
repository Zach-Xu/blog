import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { errorMessageMap } from "../utils/error-utils"
import { updateErrorMessage } from "../redux/slices/error-message-slice"

export const useValidation = () => {

    const dispatch = useDispatch()

    const validateData = useCallback((data: { [key: string]: any }): boolean => {
        let valid = true
        for (const [key, value] of Object.entries(data)) {

            if (typeof value === 'boolean') {
                continue
            }
            if (!value || (typeof value === 'string' && value.trim() === '') || (Array.isArray(value) && value.length === 0)) {
                valid = false
                dispatch(updateErrorMessage({ [key]: errorMessageMap[key] }))
                break
            }
        }
        return valid
    }, [])

    return validateData
}