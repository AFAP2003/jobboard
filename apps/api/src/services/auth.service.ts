import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../config";
import { putAccessToken, putEmailConfirmation, putPasswordResetToken, putRefreshToken } from "../helpers/jwt.handler";
import { sendEmailConfirmation, sendPasswordResetEmail } from "../nodemailer";
import { prismaClient } from "../prisma";
import authRepository from "../repositories/auth.repository";
import jwt, { JwtPayload } from "jsonwebtoken";

class authService{
    async register(signUpdata:any){
        const user = await authRepository.createAccount(signUpdata)
        return user
    }

    async sendEmailConfirmation(email:string){  
        const token = await putEmailConfirmation(email);
        await sendEmailConfirmation(email,{email, token} )
        return{
            token
        }
    }

     async verifyEmailToken(token: string) {
        const payload = jwt.verify(token, JWT_ACCESS_SECRET) as { email: string };
        

        const user = await authRepository.findUserByEmail(payload.email);

        await prismaClient.user.update({
            where: { id: user.id },
            data: { isVerified: true } // Ensure your Prisma schema has this field
        });

        return true;
    }


    async signIn(email:string, password:string){
        const user = authRepository.login(email,password)
        return user}

    async googleSignIn(email:string,name:string,googleId:string){
        const user = await authRepository.findUserByGoogleId(googleId);   
        return user
    }

    async sendPasswordResetEmail(email:string){
        const token = await putPasswordResetToken(email);
        await sendPasswordResetEmail(email,{email, token} )
        return{
            token
        }
    }

    async verifyPasswordResetEmailToken(token:string){
        const payload = jwt.verify(token, JWT_ACCESS_SECRET) as { email: string, type: string };
        if (payload.type !== 'password-reset') throw new Error('Invalid token type');
        return payload.email;
    }

    async sendNewPassword(token:string, newPassword:string){
        // Implementation for sending new password
            const payload = jwt.verify(token, JWT_ACCESS_SECRET) as { email: string, type: string };
            if (payload.type !== 'password-reset') throw new Error('Invalid token type');
            const user = await authRepository.findUserByEmail(payload.email);
            await authRepository.updatePassword(user.email as any, newPassword);
            return true;
    }

     async refreshToken(refreshToken: string) {
        if (!refreshToken) {
            throw new Error("Refresh token required");
        }
        let payload: string | JwtPayload;
        try {
            payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
        } catch (err) {
            throw new Error("Invalid or expired refresh token");
        }
        if (typeof payload !== 'object' || !('id' in payload)) {
            throw new Error("Invalid refresh token payload");
        }
        // Optionally, check if user still exists
        const user = await prismaClient.user.findUnique({ where: { id: (payload as JwtPayload).id as string } });
        if (!user) {
            throw new Error("User not found");
        }
        // Issue new tokens (rotate refresh token for best practice)
        const newAccessToken = await putAccessToken({ id: user.id, email: user.email });
        const newRefreshToken = await putRefreshToken({ id: user.id });
        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            expiresIn: 60 // 5 minutes in seconds
        };
    }
}

export default new authService();