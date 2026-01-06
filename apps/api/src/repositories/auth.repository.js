"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
class authRepository {
    async createAccount(signUpdata) {
        const existingUser = await prisma_1.prismaClient.user.findUnique({
            where: {
                email: signUpdata.email
            }
        });
        if (existingUser) {
            throw new Error("Email already in use");
        }
        const hashedPassword = await bcrypt_1.default.hash(signUpdata.password, 10);
        const user = await prisma_1.prismaClient.user.create({
            data: {
                name: signUpdata.name,
                email: signUpdata.email,
                password: hashedPassword
            }
        });
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async login(email, password) {
        const user = await this.findUserByEmail(email);
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }
        const { password: pass, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async findUserByEmail(email) {
        const user = await prisma_1.prismaClient.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user) {
            throw new Error("User not found!");
        }
        return user;
    }
    async updatePassword(email, newPassword) {
        const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
        await prisma_1.prismaClient.user.update({
            where: {
                email: email
            },
            data: {
                password: hashedPassword
            }
        });
    }
}
exports.default = new authRepository();
