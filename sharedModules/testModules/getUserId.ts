import { sessionTokenAuthentification } from "../jwt/jwtManagement"
import { getAuthentificationToken } from "./login"

export const getUserId = async (credentials: any) => {
  const token: any = await getAuthentificationToken(`https://development.alexandre-sage-dev.fr/auth/logIn`, credentials)
  return sessionTokenAuthentification(token.token)
}