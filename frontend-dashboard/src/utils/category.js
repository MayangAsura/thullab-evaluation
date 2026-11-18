import axios from "axios";
import { toast } from "react-toastify";

// export const classes = []

export const getCategories = async () => {
  try {

    await axios.get(`${BASE_URL}/api/categories`, {withCredentials: true})
                .then(result => {
                  if(result == 200){
                    return result.data.data
                  }else{
                    return 0
                  }
                })
                .catch(error => {
                  toast.error("Error when get categories", error)
                })

  } catch (error) {

    toast.error("Error when get categories", error)

  }
}

// export const getCertificates = async () => {
//   try {

//     await axios.get(`${BASE_URL}/api/certificates`, {withCredentials: true})
//                 .then(result => {
//                   if(result == 200){
//                     return result.data.data
//                   }else{
//                     return 0
//                   }
//                 })
//                 .catch(error => {
//                   toast.error("Error when get categories", error)
//                 })

//   } catch (error) {

//     toast.error("Error when get categories", error)

//   }
// }