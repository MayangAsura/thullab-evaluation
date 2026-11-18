import axios from "axios";
import { toast } from "react-toastify";


export const getSpeakers = async () => {
  try {

    await axios.get(`${BASE_URL}/api/speakers`, {withCredentials: true})
                .then(result => {
                  if(result == 200){
                    return result.data.data
                  }
                })
                .catch(error => {
                  toast.error("Error when get learning content", error)
                })

  } catch (error) {

    toast.error("Error when get learning content", error)

  }
}

export const getSpeakerById = async (id) => {
  try {

    await axios.get(`${BASE_URL}/api/speakers/${id}`, {withCredentials: true})
                .then(result => {
                  if(result == 200){
                    return result.data.data
                  }
                })
                .catch(error => {
                  toast.error("Error when get learning content", error)
                })

  } catch (error) {

    toast.error("Error when get learning content", error)

  }
}

export const updateSpeaker = async (id, data) => {
  try {

    await axios.get(`${BASE_URL}/api/speakers/${id}`, data, {withCredentials: true})
                .then(result => {
                  if(result == 200){
                    return result.data.data
                  }
                })
                .catch(error => {
                  toast.error("Error when get learning content", error)
                })

  } catch (error) {

    toast.error("Error when get learning content", error)

  }
}

export const deleteSpeaker = async (id) => {
  try {

    await axios.delete(`${BASE_URL}/api/speakers/${id}`, {withCredentials: true})
                .then(result => {
                  if(result == 200){
                    return result.data.data
                  }
                })
                .catch(error => {
                  toast.error("Error when get learning content", error)
                })

  } catch (error) {

    toast.error("Error when get learning content", error)

  }
}