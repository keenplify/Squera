import { AxiosResponse } from "axios"

export const ErrorParser = (res:AxiosResponse<any>) => {
  let errors:any = {}
  if (res.data?.name === "MongoError") {
    // ERROR FOUND
    errors['found'] = true
    if (res.data.code === 11000) { // ERROR: DUPE FOUND
      Object.keys(res.data.keyValue).map((key)=> {
        errors[key] = 'Duplicate found!'
      })
    }
  }

  return errors
}