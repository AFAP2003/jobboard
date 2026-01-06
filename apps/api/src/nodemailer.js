"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPasswordResetEmail = exports.sendEmailConfirmation = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const fs_1 = __importDefault(require("fs"));
const handlebars_1 = __importDefault(require("handlebars"));
const config_1 = require("./config");
const path_1 = __importDefault(require("path"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: config_1.NODEMAILER_USER,
        pass: config_1.NODEMAILER_PASS
    }
});
const sendEmailConfirmation = async (to, body) => {
    const templatePath = path_1.default.join(__dirname, 'templates', 'signUp-confirmation.hbs');
    console.log("Checking for template at:", templatePath);
    if (!fs_1.default.existsSync(templatePath)) {
        console.error("TEMPLATE NOT FOUND! Check your folder structure.");
        return;
    }
    const templateSource = fs_1.default.readFileSync(templatePath, 'utf8');
    const template = handlebars_1.default.compile(templateSource);
    const subject = "Email Confirmation";
    const html = template(body);
    try {
        await transporter.sendMail({
            from: config_1.NODEMAILER_USER,
            to,
            subject,
            html,
        });
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
};
exports.sendEmailConfirmation = sendEmailConfirmation;
const sendPasswordResetEmail = async (to, body) => {
    const templatePath = path_1.default.join(__dirname, 'templates', 'reset-password.hbs');
    const templateSource = fs_1.default.readFileSync(templatePath, 'utf8');
    const template = handlebars_1.default.compile(templateSource);
    const subject = "Reset your password";
    const html = template(body);
    try {
        await transporter.sendMail({
            from: config_1.NODEMAILER_USER,
            to,
            subject,
            html,
        });
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
};
exports.sendPasswordResetEmail = sendPasswordResetEmail;
