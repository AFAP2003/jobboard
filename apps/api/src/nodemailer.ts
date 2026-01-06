import nodemailer from 'nodemailer';
import fs from 'fs';
import handlebars from 'handlebars'
import { NODEMAILER_PASS,NODEMAILER_USER } from './config';
import path from 'path';



const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:NODEMAILER_USER,
        pass:NODEMAILER_PASS
    }
})

export const sendEmailConfirmation = async (
    to:string,
    body:any
)=>{
    const templatePath = path.join(__dirname, 'templates', 'signUp-confirmation.hbs');
    console.log("Checking for template at:", templatePath);

    if (!fs.existsSync(templatePath)) {
        console.error("TEMPLATE NOT FOUND! Check your folder structure.");
        return;
    }
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateSource);
    const subject = "Email Confirmation";
    const html = template(body)

    try {
        await transporter.sendMail({
            from: NODEMAILER_USER,
            to, 
            subject,            
            html,           
        })
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

export const sendPasswordResetEmail = async (
    to:string,
    body: { token: string, email: string }
)=>{
    const templatePath = path.join(__dirname, 'templates', 'reset-password.hbs');
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateSource);
    const subject = "Reset your password";
    const html = template(body)

    try {
        await transporter.sendMail({
            from: NODEMAILER_USER,
            to, 
            subject,            
            html,           
        })
    } catch (error) {
        console.error("Error sending email:", error);
    }
}


