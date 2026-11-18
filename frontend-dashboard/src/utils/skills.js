import axios from "axios";
import { toast } from 'react-toastify'

export const skills = []

export const getSkills = async () => {
  try {

    await axios.get(`${BASE_URL}/api/skills`, {withCredentials: true})
                .then(result => {
                  if(result == 200){
                    return result.data.data
                  }
                })
                .catch(error => {
                toast.error("Error when get skills", error)
                })

  } catch (error) {

    toast.error("Error when get skills", error)

  }
}

export const getSkillById = async (id) => {
  try {

    await axios.get(`${BASE_URL}/api/skills/${id}`, {withCredentials: true})
                .then(result => {
                  if(result == 200){
                    return result.data.data
                  }
                })
                .catch(error => {
                  toast.error("Error when get skills", error)
                })

  } catch (error) {

    toast.error("Error when get skills", error)

  }
}

export const updateSkill = async (id, data) => {
  try {

    await axios.update(`${BASE_URL}/api/skills/${id}`, data, {withCredentials: true})
                .then(result => {
                  if(result == 200){
                    return result.data.data
                  }
                })
                .catch(error => {
                  toast.error("Error when get skills", error)
                })

  } catch (error) {

    toast.error("Error when get skills", error)

  }
}

export const deleteSkill = async (id) => {
  try {

    await axios.delete(`${BASE_URL}/api/skills/${id}`, {withCredentials: true})
                .then(result => {
                  if(result == 200){
                    return result.data.data
                  }
                })
                .catch(error => {
                  toast.error("Error when get skills", error)
                })

  } catch (error) {

    toast.error("Error when get skills", error)

  }
}