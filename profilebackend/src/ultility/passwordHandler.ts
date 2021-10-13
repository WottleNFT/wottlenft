import {compare, genSalt, hash} from 'bcrypt'
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config/config';
export async function hashPassword(password: string): Promise<string> {
  const salt = await genSalt()
  return await hash(password, salt)
}
export async function checkPassword(password: string, hashed: string): Promise<Boolean> {
    return compare(password, hashed)
}

export function extractJWT(req: Request, res: Response, next: NextFunction) {
  
  console.log("extracting token");
  let token = req.headers.authorization?.split(' ')[0]
  if (token) {
    verify(token, TOKEN_SECRET, (error, decoded) => {
      if (error) {
        return res.status(404).json({
          message: error.message,
          error
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
    return res.status(401).json({
      message: "Error accessing"
    });
  }

}
