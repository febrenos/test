import axios from "axios"

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_ROUTE,
  headers: {
    "Content-Type": "application/json",
  },
})
