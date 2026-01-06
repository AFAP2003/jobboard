"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("../services/auth.service"));
const jwt_handler_1 = require("../helpers/jwt.handler");
class authController {
    async createAccount(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const data = await auth_service_1.default.register({ name, email, password });
            res.status(200).send({
                success: true,
                message: "Account created successfully",
                data
            });
        }
        catch (error) {
            next(error);
        }
    }
    async sendEmailConfirmation(req, res, next) {
        try {
            const { email } = req.body;
            await auth_service_1.default.sendEmailConfirmation(email);
            res.status(200).send({
                success: true,
                message: "Email confirmation sent successfully"
            });
        }
        catch (error) {
            next(error);
        }
    }
    async verifyEmailConfirmation(req, res, next) {
        try {
            const { token } = req.params;
            await auth_service_1.default.verifyEmailToken(token);
            res.status(200).send({
                success: true,
                message: "Email confirmed successfully"
            });
        }
        catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const data = await auth_service_1.default.signIn(email, password);
            const accessToken = await (0, jwt_handler_1.putAccessToken)({ id: data.id, email: data.email });
            const refreshToken = await (0, jwt_handler_1.putRefreshToken)({ id: data.id });
            res.status(200).send({
                success: true,
                message: " Login successful",
                data: {
                    id: data.id,
                    email: data.email,
                    accessToken,
                    refreshToken,
                    expiresIn: 300
                }
            });
        }
        catch (error) {
            next(error);
        }
    }
    async sendResetPasswordEmail(req, res, next) {
        try {
            const { email } = req.body;
            await auth_service_1.default.sendPasswordResetEmail(email);
            // Here you would typically send the token via email to the user
            res.status(200).send({
                success: true,
                message: "Password reset email sent successfully"
            });
        }
        catch (error) {
            next(error);
        }
    }
    async verifyPasswordResetEmailToken(req, res, next) {
        try {
            const { token } = req.params;
            const email = await auth_service_1.default.verifyPasswordResetEmailToken(token);
            res.status(200).send({
                success: true,
                message: "Password reset token verified successfully",
                email
            });
        }
        catch (error) {
            next(error);
        }
    }
    async resetPassword(req, res, next) {
        try {
            // Implementation for password reset
            const { token, password } = req.body;
            await auth_service_1.default.sendNewPassword(token, password);
            res.status(200).send({ message: "Password reset is successfull" });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new authController();
