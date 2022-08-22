import nodemailer from "nodemailer"

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        })
    }

    async sendActivationMail(to, link){
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: to,
            subject: "Астивация аккаунта на" + process.env.API_URL,
            text: "",
            html:
                `
                <div>
                    <h1>Для активации перейдите по ссылке</h1>
                    <a href="${link}">${link}</a>
                </div>
                `  
        })
    }

    async sendSwitchPasswordCodeMail(to, key){
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: to,
            subject: "Код для смены пароля",
            text: "",
            html:
                `
                <div>
                    <h1>Код для смены пароля</h1>
                    <p>${key}</p>
                </div>
                `  
        })
    }
}

export default new MailService