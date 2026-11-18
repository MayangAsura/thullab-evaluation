import axios from "axios";
import { toast } from "react-toastify";

export const Files = []

export const getFiles = async () => {
  try {

    await axios.get(`${BASE_URL}/api/files`, {withCredentials: true})
                .then(result => {
                  if(result == 200){
                    Files = result.data.data
                  }
                })
                .catch(error => {
                  toast.error("Error when get learning content", error)
                })

  } catch (error) {

    toast.error("Error when get learning content", error)

  }
}

export const getFileById = async (id) => {
  try {

    await axios.get(`${BASE_URL}/api/files/${id}`, {withCredentials: true})
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

export const updateFile = async (id, data) => {
  try {

    await axios.patch(`${BASE_URL}/api/files/${id}`, data, {withCredentials: true})
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

export const deleteFile = async (id) => {
  try {

    await axios.delete(`${BASE_URL}/api/files/${id}`, {withCredentials: true})
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