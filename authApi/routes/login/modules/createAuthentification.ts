import { database } from "../../../../mongoDb/server/database";
import { CustomError } from "../../../../sharedModules/errors/errorClass";
import { setSessionToken } from "../../../../sharedModules/jwt/jwtManagement";

interface AuthentificationInterface {
  sessionToken: string,
  userName: string
}



export const createAuthentification = async (password: string, email: string): Promise<AuthentificationInterface> => {
  const researchObject = { email: email };
  try {
    const user = await database.userRepository.getUserDataByEmailForAuthentification({ email })
    if (!user) throw new CustomError(`email: ${email} not found please retry`, "CREATE AUTHENTIFICATION", 400);
    const tokenExpirations = `${3600 * 24 * 10}s`;
    await user.checkPassword(password)
    const tokenData = {
      userId: user._id,
      userName: user.userName,
    };
    return {
      sessionToken: setSessionToken(tokenData, tokenExpirations),
      userName: user.userName
    };
  } catch (error: any) {
    return Promise.reject(error)
  };
};