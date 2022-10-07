import { toast } from "react-toastify";


export const ToastError = (message) => {
    toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
    });
}


export const ToastSuccess = (message) => {
    toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
    });
}