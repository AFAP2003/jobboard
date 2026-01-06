"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putAccessToken = putAccessToken;
exports.putRefreshToken = putRefreshToken;
exports.putEmailConfirmation = putEmailConfirmation;
exports.putPasswordResetToken = putPasswordResetToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
async function putAccessToken(data) {
    return jsonwebtoken_1.default.sign(data, config_1.JWT_ACCESS_SECRET, {
        expiresIn: '5m' // 5 minutes
    });
}
async function putRefreshToken(data) {
    return jsonwebtoken_1.default.sign(data, config_1.JWT_REFRESH_SECRET, {
        expiresIn: '7d' // 7 days
    });
}
async function putEmailConfirmation(email) {
    return jsonwebtoken_1.default.sign({ email }, config_1.JWT_ACCESS_SECRET, {
        expiresIn: '10m'
    });
}
async function putPasswordResetToken(email) {
    return jsonwebtoken_1.default.sign({ email, type: 'password-reset' }, config_1.JWT_ACCESS_SECRET, {
        expiresIn: '15m' // 15 minutes
    });
}
