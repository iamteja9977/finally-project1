import nodemailer from "nodemailer";

async function sendEmail(mailBody) {
    try {
        let transporter = nodemailer.createTransport({
            host: "mail.csmafia.com",
            port: 465,
            secure: true,
            auth: {
                user: "cfi@csmafia.com",
                pass: "codeforindiaFTW"
            }
        });
        let info = await transporter.sendMail({
            from: `CFI Tasky Solutions <cfi@csmafia.com>`,
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