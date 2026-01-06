"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const jwt_handler_1 = require("../helpers/jwt.handler");
const nodemailer_1 = require("../nodemailer");
const prisma_1 = require("../prisma");
const auth_repository_1 = __importDefault(require("../repositories/auth.repository"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class authService {
    async register(signUpdata) {
        const user = await auth_repository_1.default.createAccount(signUpdata);
        return user;
    }
    async sendEmailConfirmation(email) {
        const token = await (0, jwt_handler_1.putEmailConfirmation)(email);
        await (0, nodemailer_1.sendEmailConfirmation)(email, { email, token });
        return {
            token
        };
    }
    async verifyEmailToken(token) {
        const payload = jsonwebtoken_1.default.verify(token, config_1.JWT_ACCESS_SECRET);
        const user = await auth_repository_1.default.findUserByEmail(payload.email);
        await prisma_1.prismaClient.user.update({
            where: { id: user.id },
            data: { isVerified: true } // Ensure your Prisma schema has this field
        });
        return true;
    }
    async signIn(email, password) {
        const user = auth_repository_1.default.login(email, password);
        return user;
    }
    async sendPasswordResetEmail(email) {
        const token = await (0, jwt_handler_1.putPasswordResetToken)(email);
        await (0, nodemailer_1.sendPasswordResetEmail)(email, { email, token });
        return {
            token
        };
    }
    async verifyPasswordResetEmailToken(token) {
        const payload = jsonwebtoken_1.default.verify(token, config_1.JWT_ACCESS_SECRET);
        if (payload.type !== 'password-reset')
            throw new Error('Invalid token type');
        return payload.email;
    }
    async sendNewPassword(token, newPassword) {
        // Implementation for sending new password
        const payload = jsonwebtoken_1.default.verify(token, config_1.JWT_ACCESS_SECRET);
        if (payload.type !== 'password-reset')
            throw new Error('Invalid token type');
        const user = await auth_repository_1.default.findUserByEmail(payload.email);
        await auth_repository_1.default.updatePassword(user.email, newPassword);
        return true;
    }
}
exports.default = new authService();
