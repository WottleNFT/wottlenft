import {compare, genSalt, hash} from 'bcrypt'
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verify } from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config/config';
import { getUserByUsername, getUserByWalletID } from '../database/userQueries';
export async function hashPassword(password: string): Promise<string> {
  const salt = await genSalt()
  return await hash(password, salt)
}
export async function checkPassword(password: string, hashed: string): Promise<Boolean> {
    return compare(password, hashed)
}
export async function checkIfWalletIdAndUserNameMatch(wallet_id: string, username:string): Promise<Boolean> {
  let data = await getUserByUsername(username)
  if (data == null) {
    return false;
  }
  return data.wallet_id == wallet_id
}
export function extractJWT(req: Request, res: Response, next: NextFunction) {
  
  let token = req.headers.authorization?.split(' ')[1]
  if (token) {
    verify(token, TOKEN_SECRET, (error, decoded) => {
      if (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          err: error.message,
        })
      } 
      else 
      {
        res.locals.jwt = decoded;
        next()
      }
    })
  }
  else {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errorMessage: "Error accessing"
    });
  }

}
