const API_URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : 'localhost:8080'
export const LOGIN_URL = API_URL + "/api/auth/signin"
export const SMOOTHIES_URL = API_URL + "/api/smoothie/smoothies"
export const SMOOTHY_URL_BASE = API_URL + "/api/smoothie"