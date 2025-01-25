import axios from "axios"
import constant from "../constant"
import { setStorage , getAuthHeader } from "../utils"

export const login = async(model)=>{
  const url = `${process.env.REACT_APP_BASE_URL}/v1/login`
    return axios.post(url , model)
        .then((res)=>{
            if(res.data.status){
                setStorage(constant.keys.token , res.data.result.token)
                setStorage(constant.keys.userDetail , res.data.result.user_detail)
            }

            return res.data
        })
}

export const loadUserList = async()=>{
    const url = `${process.env.REACT_APP_BASE_URL}/v1/userList`
    return axios.get(url , getAuthHeader())
        .then((res)=>{
            return res.data
        })
}

export const createUser = async(model)=>{
    const url = `${process.env.REACT_APP_BASE_URL}/v1/create_user`
    return axios.post(url , model , getAuthHeader())
        .then((res)=>{
            return res.data
        })
}


export const updateUser = async(model)=>{
    const url = `${process.env.REACT_APP_BASE_URL}/v1/update_user`
    return axios.put(url ,model , getAuthHeader())
        .then((res)=>{
            return res.data
        })
}

export const getCount = async()=>{
    const url = `${process.env.REACT_APP_BASE_URL}/v1/get_count`
    return axios.get(url , getAuthHeader())
        .then((res)=>{
            return res.data
        })
}