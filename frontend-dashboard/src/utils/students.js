import axios from "axios";
import { toast } from "react-toastify";


export const getStudents = async () => {
  try {

    await axios.get(`${BASE_URL}/api/students`, {withCredentials: true})
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

export const getStudentById = async (id) => {
  try {

    await axios.get(`${BASE_URL}/api/students/${id}`, {withCredentials: true})
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

export const updateStudent = async (id, data) => {
  try {

    await axios.get(`${BASE_URL}/api/students/${id}`, data, {withCredentials: true})
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

export const deleteStudent = async (id) => {
  try {

    await axios.delete(`${BASE_URL}/api/students/${id}`, {withCredentials: true})
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