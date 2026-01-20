import { prismaClient } from "../prisma";
import bcrypt from "bcrypt";

class authRepository{
    async createAccount (signUpdata:any){
        const existingUser = await prismaClient.user.findUnique({
            where:{
                email:signUpdata.email
            }
        
        })

        if (existingUser){
            throw new Error("Email already in use");
        }
            const hashedPassword = await bcrypt.hash(signUpdata.password,10);

            const user = await prismaClient.user.create({
                data:{
                    name:signUpdata.name,
                    email:signUpdata.email,
                    password:hashedPassword
                }   
            })
            const {password,...userWithoutPassword} = user;
            return userWithoutPassword; 
        }

    async createGoogleUser(data:{email:string,name:string,googleId:string}){
        const user = await prismaClient.user.create({
            data:{
                email:data.email,
                name:data.name,
                googleId:data.googleId,
                authProvider:"GOOGLE",
                isVerified:true
            }
        }) 

    }
    async login (email:string,password:string){
        const user = await this.findUserByEmail(email);
         if(!user){
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await bcrypt.compare(password,user.password as string);

        if(!isPasswordValid){
            throw new Error("Invalid credentials");
        }

        const {password:pass,...userWithoutPassword} = user;
            return userWithoutPassword; 
    }

    async findUserByEmail(email:string){
        const user = await prismaClient.user.findUnique({
            where:{
                email:email
    }
        })

        if(!user){
            throw new Error("User not found!")
        }
        return user;
    }

    async updateUserWithGoogleId(userId:string,googleId:string){
        await prismaClient.user.update({
            where:{id:userId},
            data:{googleId:googleId, authProvider:"GOOGLE", isVerified:true}
        })
    }

    async findUserByGoogleId (googleId: string)  {
        const user = await prismaClient.user.findFirst({
        where: { googleId }
    });

    return user;
    };
        
    async updatePassword(email:string, newPassword:string){
        const hashedPassword = await bcrypt.hash(newPassword,10);
        await prismaClient.user.update({
            where:{
                email:email
            },
            data:{
                password:hashedPassword
            }
        })
    }
}

export default new authRepository();