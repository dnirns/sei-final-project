
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const loginSuccess = (message) => {
  toast.success(message, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  })
}

export const loginError = () => {
  toast.error('Incorrect Login Details', {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  })
}