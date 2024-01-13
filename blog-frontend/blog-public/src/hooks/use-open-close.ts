import { useCallback, useState } from "react"

export const useOpenClose = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [])

  return {
    handleClose,
    handleOpen,
    open
  }
}