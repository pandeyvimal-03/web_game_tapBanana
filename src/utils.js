import constant from "./constant";
import { toast } from "react-toastify";

export const getAuthHeader = () => {
    const token = getStorage(constant.keys.token);
    const header = {
        headers: { Authorization: "Bearer " + token }
    };
    return header;
}

export const setStorage = (key, jsonObj) => {
    localStorage.setItem(key, JSON.stringify(jsonObj));
}

export const getStorage = (keyName) => {
    const item = localStorage.getItem(keyName);
    return JSON.parse(item);
}

export const removeAllLocalStorge = () => {
    localStorage.clear();
}

export const failedToast = (msg)=>{
    toast.error(msg, {
        position: 'top-center',
        autoClose: 3000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light', 
      });
}

export const successToast = (msg)=>{
    toast.success(msg, {
        position: 'top-center',
        autoClose: 3000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
}