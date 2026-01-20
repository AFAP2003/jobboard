import express from 'express'
import authController from '../controllers/auth.controller'

export const authRouter = () => {
    const router = express.Router()
    router.post('/signup', authController.createAccount)
    router.post('/login', authController.login)
    router.post('/email-confirmation',authController.sendEmailConfirmation)
    router.post('/reset-password',authController.resetPassword)
    router.patch('/verify-email/:token',authController.verifyEmailConfirmation)
    router.post('/verify-password-reset-token/:token',authController.verifyPasswordResetEmailToken)
    router.post('/reset-password-email',authController.sendResetPasswordEmail)
    router.post('/google-signin',authController.googleLogin)
    return router
}



