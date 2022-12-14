
import { LOGIN_URL } from "./Apis"



const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export const validityVerify = () => {
  const storedUser = localStorage.getItem("user")
  if (!storedUser)
    return
  const token = JSON.parse(storedUser).accessToken
  const splitToken = token.split('.')
  const decodedTokenContent = JSON.parse(atob(splitToken[1]))

  if (decodedTokenContent.exp * 1000 < Date.now()) {
    logout()
  }
}


export const login = async (username, password) => {
  let res = await fetch(LOGIN_URL, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })

  if (res.status == 200) {
    console.log("login successful")
    const resData = await res.json()
    if (resData.username) {
      localStorage.setItem("user", JSON.stringify(resData))
      window.dispatchEvent( new Event('storage') )
      return true
    }
  }
  return false
};

export const logout = () => {
  localStorage.removeItem("user")
  window.dispatchEvent( new Event('storage') )
};

export const getLoggedUser = () => {
  validityVerify()
  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : {}
};

export const isLoggedIn = () => {
  validityVerify()
  const user = localStorage.getItem("user")
  return user ? true : false
}

export const authorizedFetch = async (url, params) => {
  const user = getLoggedUser()
  const authHeader = user.tokenType + " " + user.accessToken
  if (params.headers)
    params.headers.Authorization = authHeader
  else
    params.headers = { Authorization : authHeader }
  return fetch(url, params)
}