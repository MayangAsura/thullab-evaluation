import axios from "axios";
import { toast } from "react-toastify";


export const getRoles = async () => {
  try {

    await axios.get(`${BASE_URL}/api/roles`, {withCredentials: true})
                .then(result => {
                  if(result == 200){
                    return result.data.data
                  }
                })
                .catch(error => {
                  toast.error("Error when get Roless", error)
                })

  } catch (error) {

    toast.error("Error when get Roless", error)

  }
}

export const getRoleById = async (id) => {
  try {

    await axios.get(`${BASE_URL}/api/roles/${id}`, {withCredentials: true})
                .then(result => {
                  if(result == 200){
                    return result.data.data
                  }else{
                    return 0
                  }
                })
                .catch(error => {
                  toast.error("Error when get Roles", error)
                })

  } catch (error) {

    toast.error("Error when get Roles", error)

  }
}

export const updateRoles = async (data) => {
  try {

    await axios.get(`${BASE_URL}/api/roles`, data, {withCredentials: true})
                .then(result => {
                  if(result == 200){
                    return result.data.data
                  }else{
                    return 0
                  }
                })
                .catch(error => {
                  toast.error("Error when get Roless", error)
                })

  } catch (error) {

    toast.error("Error when get Roless", error)

  }
}

export const deleteClass = async (id) => {
  try {

    await axios.delete(`${BASE_URL}/api/roles/${id}`, {withCredentials: true})
                .then(result => {
                  if(result == 200){
                    return result.data.data
                  }else{
                    return 0
                  }
                })
                .catch(error => {
                  toast.error("Error when get Roles", error)
                })

  } catch (error) {

    toast.error("Error when get Roles", error)

  }
}