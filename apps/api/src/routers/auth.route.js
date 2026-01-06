"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const authRouter = () => {
    const router = express_1.default.Router();
    router.post('/signup', auth_controller_1.default.createAccount);
    router.post('/login', auth_controller_1.default.login);
    router.post('/email-confirmation', auth_controller_1.default.sendEmailConfirmation);
    router.post('/reset-password', auth_controller_1.default.resetPassword);
    router.patch('/verify-email/:token', auth_controller_1.default.verifyEmailConfirmation);
    router.post('/verify-password-reset-token/:token', auth_controller_1.default.verifyPasswordResetEmailToken);
    router.post('/reset-password-email', auth_controller_1.default.sendResetPasswordEmail);
    return router;
};
exports.authRouter = authRouter;
