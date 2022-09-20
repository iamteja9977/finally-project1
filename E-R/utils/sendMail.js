import nodemailer from "nodemailer";
import config from "config";

let { HOST, AUTH, PORT } = config.get("EMAIL_SMTP");

async function sendEmail(mailBody) {
    try {
        let transporter = nodemailer.createTransport({
            host: HOST,
            port: PORT,
            secure: true,
            auth: {
                user: AUTH["USER"],
                pass: AUTH["PASSWORD"]
            }
        });
        let info = await transporter.sendMail({
            from: `CFI Tasky Solutions <${AUTH["USER"]}>`,
            subject: mailBody.subject,
            to: mailBody.to,
            // body:"This is SImple Plain Text",
            html: mailBody.html
        })
        console.log(info.messageId);
    } catch (error) {
        console.error(error);
    }
}

export default sendEmail;