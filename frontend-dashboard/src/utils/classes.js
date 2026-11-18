import axios from "axios";
import { toast } from "react-toastify";

export const classes = []

export const getClasses = async () => {
  try {

    await axios.get(`${BASE_URL}/api/classes`, {withCredentials: true})
                .then(result => {
                  if(result == 200){
                    classes = result.data.data
                  }
                })
                .catch(error => {
                  toast.error("Error when get classess", error)
                })

  } catch (error) {

    toast.error("Error when get classess", error)

  }
}

export const getClassById = async (id) => {
  try {

    await axios.get(`${BASE_URL}/api/classes/${id}`, {withCredentials: true})
                .then(result => {
                  if(result == 200){
                    return result.data.data
                  }else{
                    return 0
                  }
                })
                .catch(error => {
                  toast.error("Error when get classes", error)
                })

  } catch (error) {

    toast.error("Error when get classes", error)

  }
}

export const updateClasses = async (data) => {
  try {

    await axios.get(`${BASE_URL}/api/classes`, data, {withCredentials: true})
                .then(result => {
                  if(result == 200){
                    return result.data.data
                  }else{
                    return 0
                  }
                })
                .catch(error => {
                  toast.error("Error when get classess", error)
                })

  } catch (error) {

    toast.error("Error when get classess", error)

  }
}

export const deleteClass = async (id) => {
  try {

    await axios.delete(`${BASE_URL}/api/classes/${id}`, {withCredentials: true})
                .then(result => {
                  if(result == 200){
                    return result.data.data
                  }else{
                    return 0
                  }
                })
                .catch(error => {
                  toast.error("Error when get classes", error)
                })

  } catch (error) {

    toast.error("Error when get classes", error)

  }
}