import { NextFunction,Request,Response } from "express";
import authService from "../services/auth.service";
import { putAccessToken, putPasswordResetToken, putRefreshToken } from "../helpers/jwt.handler";

class authController{
    async createAccount (req:Request, res:Response,next:NextFunction) {     
        try {
            const { name, email, password } = req.body;       
            const data = await authService.register({name, email, password});
            res.status(200).send({ 
                success:true,
                message: "Account created successfully" ,
                data})
        }
        catch (error) {
            next(error);
        }
    }

    async sendEmailConfirmation (req:Request, res:Response,next:NextFunction) {     

        try {
            const  {email} = req.body
            await authService.sendEmailConfirmation(email)

            res.status(200).send({ 
                success:true,
                message: "Email confirmation sent successfully" })
        }
        catch (error) {
            next(error);
        }   


    }

    async verifyEmailConfirmation (req:Request, res:Response,next:NextFunction) {     
        try {
            const { token } = req.params as { token: string };
            await authService.verifyEmailToken(token);
            res.status(200).send({ 
                success:true,
                message: "Email confirmed successfully" })
        }
        catch (error) {
            next(error);
        }
    }

    async login(req:Request, res:Response,next:NextFunction) {   
        try {
            const { email, password } = req.body;      
            const data = await authService.signIn(email, password);
            const accessToken = await putAccessToken({id:data.id, email:data.email});
            const refreshToken = await putRefreshToken({id:data.id});
             res.status(200).send({
                    success:true,
                    message:" Login successful",
                    data:{
                        id:data.id,
                        email:data.email,
                        accessToken,
                        refreshToken,
                        expiresIn:300
                    }
                })
        }
            catch(error){
               next(error)
            }
    }

    async googleLogin(req:Request, res:Response,next:NextFunction) {   
        try {
            const { email, name, googleId } = req.body;      
            const data = await authService.googleSignIn(email, name, googleId);
            const accessToken = await putAccessToken({id:data!.id, email:data!.email});
            const refreshToken = await putRefreshToken({id:data!.id});

            res.status(200).send({ 
                success:true,
                message: "Google login successful",
                data: {
                     id: data!.id,
                        email: data!.email,
                        name: data!.name,
                        accessToken,
                        refreshToken,
                        expiresIn:300

                }
            });
        } catch (error) {
            next(error);
        }
    }

    async sendResetPasswordEmail(req:Request, res:Response,next:NextFunction) {   
        try {
           const  {email} = req.body
            await authService.sendPasswordResetEmail(email)
            // Here you would typically send the token via email to the user
            res.status(200).send({ 
                success:true,
                message: "Password reset email sent successfully"
            })
        }catch(error){
            next(error)
        }
    }

    async verifyPasswordResetEmailToken(req:Request, res:Response,next:NextFunction) {
        try {
            const { token } = req.params as { token: string };
            const email = await authService.verifyPasswordResetEmailToken(token);
            res.status(200).send({
                success: true,
                message: "Password reset token verified successfully",
                email
            });
        } catch (error) {
            next(error);
        }
    }

    async resetPassword(req:Request, res:Response,next:NextFunction) {   
        try {
            // Implementation for password reset
            const {token, password} = req.body;      
            await authService.sendNewPassword(token, password);
            res.status(200).send({ message: "Password reset is successfull" })
        }
            catch(error){
               next(error)
            }   
        }
    }

export default new authController();