import jwt from 'jsonwebtoken';
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '../config';

export async function putAccessToken(data:any) {
    return jwt.sign(data, JWT_ACCESS_SECRET, {
      expiresIn: '5m' // 5 minutes
    })
  }

   export async function putRefreshToken(data:any) {
    return jwt.sign(data, JWT_REFRESH_SECRET, {
      expiresIn: '7d' // 7 days
    })
  }

export async function putEmailConfirmation(email:string){
    return jwt.sign({email},JWT_ACCESS_SECRET,{
        expiresIn:'10m'
    })
}

export async function putPasswordResetToken(email: string) {
    return jwt.sign({ email, type: 'password-reset' }, JWT_ACCESS_SECRET, {
      expiresIn: '15m' // 15 minutes
    })
  }