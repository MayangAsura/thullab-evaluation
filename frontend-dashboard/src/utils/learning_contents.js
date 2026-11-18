import axios from "axios";
import { toast } from "react-toastify";


// export const learning_contents = []

export const getLearningContents = async () => {
  try {

    await axios.get(`${BASE_URL}/api/learning-contents`, {withCredentials: true})
                .then(result => {
                  console.log('result', result)
                  if(result.status == 200){

                    console.log('result', result)
                    return result.data
                  }
                })
                .catch(error => {
                  toast.error("Error when get learning content", error)
                })

  } catch (error) {

    toast.error("Error when get learning content", error)

  }
}

export const getLearningContentById = async (id) => {
  try {

    await axios.get(`${BASE_URL}/api/learning-contents/${id}`, {withCredentials: true})
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

export const updateLearningContent = async (id, data) => {
  try {

    await axios.get(`${BASE_URL}/api/learning-contents/${id}`, data, {withCredentials: true})
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

export const deleteLearningContent = async (id) => {
  try {

    await axios.delete(`${BASE_URL}/api/learning-contents/${id}`, {withCredentials: true})
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