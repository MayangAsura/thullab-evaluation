import axios from "axios";
import { toast } from "react-toastify";

export const registrants = []

export const getRegistrants = async () => {
  try {

    await axios.get(`${BASE_URL}/api/registrants`, {withCredentials: true})
                .then(result => {
                  if(result == 200){
                    return result.data.data
                  }
                })
                .catch(error => {
                  toast.error("Error when get registrants", error)
                })

  } catch (error) {

    toast.error("Error when get registrants", error)

  }
}

export const getRegistrantById = async (id) => {
  try {

    await axios.get(`${BASE_URL}/api/registrants/${id}`, {withCredentials: true})
                .then(result => {
                  if(result == 200){
                    return result.data.data
                  }
                })
                .catch(error => {
                  toast.error("Error when get registrants", error)
                })

  } catch (error) {

    toast.error("Error when get registrants", error)

  }
}

export const updateRegistrant = async (id, data) => {
  try {

    await axios.get(`${BASE_URL}/api/registrants/${id}`, data, {withCredentials: true})
                .then(result => {
                  if(result == 200){
                    return result.data.data
                  }
                })
                .catch(error => {
                  toast.error("Error when get registrants", error)
                })

  } catch (error) {

    toast.error("Error when get registrants", error)

  }
}

export const deleteRegistrant = async (id) => {
  try {

    await axios.delete(`${BASE_URL}/api/registrants/${id}`, {withCredentials: true})
                .then(result => {
                  if(result == 200){
                    return result.data.data
                  }
                })
                .catch(error => {
                  toast.error("Error when get registrants", error)
                })

  } catch (error) {

    toast.error("Error when get registrants", error)

  }
}