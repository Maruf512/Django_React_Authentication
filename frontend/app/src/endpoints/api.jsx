import axios from 'axios'


const BASE_URL = 'http://127.0.0.1:8000/api/'
const LOGIN_URL = BASE_URL + 'token/'
const NOTES_URL = BASE_URL + 'notes/'
const REFRESH_URL = BASE_URL + 'token/refresh/'
const LOGOUT_URL = BASE_URL + 'logout/'


export const login = async (username, password) => {
  const request = await axios.post(LOGIN_URL, {
    username: username,
    password: password
  },
  {  withCredentials: true }
)
  return request.data.success
}


export const refresh_token = async () => {
  try{
    await axios.post(REFRESH_URL, {}, { withCredentials: true })
    return true
  }catch(error){
    return false
  }
  }


export const get_notes = async () => {
  try{
    const request = await axios.get(NOTES_URL, { withCredentials: true })
    return request.data
  }catch(error){
    return call_refresh(error, get_notes)
  }
}



const call_refresh = async (error, func) => {
  if (error.response && error.response.state === 401) {
    const tokenRefreshed = await refresh_token()
    if (tokenRefreshed) {
      const retryResponse = await func()
      return retryResponse.data
    }
  }
  return false
}



export const logout = async () => {
  try{
    await axios.post(LOGOUT_URL, {}, { withCredentials: true })
    return true
  }catch(error){
    return false
  }
}

