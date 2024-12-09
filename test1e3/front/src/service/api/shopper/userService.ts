import { getCookie, setCookie } from "../../../utils"
import { api } from "./api"

export interface LoginModel {
  login: string
  password: string
}

/**
 * Estima uma corrida com base nos detalhes fornecidos.
 * @param body - Corpo da requisição contendo os dados da corrida.
 */
export const loginAction = async (body: LoginModel) => {
  try {
    console.log("loginAction")
    // const response = await api.post("auth/login", body)
    setCookie("user_token", "eyJhbGciOiJ", 7)
    console.log("TOKEN:", getCookie("user_token"))
    return getCookie("user_token")
  } catch (error) {
    console.error("Erro ao estimar a corrida:", error)
    throw error
  }
}

export const userInfoAction = async () => {
  try {
    console.log("userInfoAction")
    // const response = await api.get("auth/login", body)
    return {
      nome:"test",
      idade:"21",
      data_nasciment:"20/11/2001"
    }
  } catch (error) {
    console.error("Erro ao estimar a corrida:", error)
    throw error
  }
}