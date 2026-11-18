import axios from "axios";
import { toast } from "react-toastify";


export const getProfile = async () => {
  try {

    await axios.get(`${BASE_URL}/api/profile`, {withCredentials: true})
                .then(result => {
                  if(result == 200){
                    return result.data.data
                  }else{
                    return 0
                  }
                })
                .catch(error => {
                  toast.error("Error when get learning content", error)
                })

  } catch (error) {

    toast.error("Error when get learning content", error)

  }
}

export const updateProfile = async (data) => {
  try {

    await axios.patch(`${BASE_URL}/api/profile`, data, {withCredentials: true})
                .then(result => {
                  if(result == 200){

                    return result.data.data
                  }else{
                    console.log(result.data)
                    return 0
                    // return result.data.Error
                  }
                })
                .catch(error => {
                  return error
                  toast.error("Error when get learning content", error)
                })

  } catch (error) {
    toast.error("Error when get learning content", error)

  }
}

export const updatePassword = async (data) => {
  try {

    await axios.patch(`${BASE_URL}/api/reset-password`, data, {withCredentials: true})
                .then(result => {
                  if(result == 200){

                    return result.data.data
                  }else{
                    console.log(result.data)
                    return 0
                    // return result.data.Error
                  }
                })
                .catch(error => {
                  return error
                  toast.error("Error when get learning content", error)
                })

  } catch (error) {
    toast.error("Error when get learning content", error)

  }
}

export const forgotPassword = async (data) => {
  try {

    await axios.patch(`${BASE_URL}/api/forgot-password`, data, {withCredentials: true})
                .then(result => {
                  if(result == 200){

                    return result.data.data
                  }else{
                    console.log(result.data)
                    return 0
                    // return result.data.Error
                  }
                })
                .catch(error => {
                  return error
                  toast.error("Error when get learning content", error)
                })

  } catch (error) {
    toast.error("Error when get learning content", error)

  }
}