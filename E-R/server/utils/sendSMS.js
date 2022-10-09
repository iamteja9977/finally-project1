import twilio from 'twilio';
import config from "config";

const { TWILIO_SID, TWILIO_TOKEN, TWILIO_NUMBER } = config.get("SEND_SMS");

const accountSid = TWILIO_SID;
const authToken = TWILIO_TOKEN;
const client = new twilio(accountSid, authToken);

// let smsbody = 3eb5d53adb7b1e758ffeeec2f6972327{
//     body: "this is a reminder",
//     to: "+919014828737"
// }
async function sendSMS(smsbody) {
    try {
        let message = await client.messages
            .create({
                body: smsbody.body,
                from: TWILIO_NUMBER,
                to: smsbody.to
            })
        console.log(message.sid);
    } catch (error) {
        console.error(error)
    }
}
export default sendSMS;
// sendSMS({
//     body: `Thank you for Signing Up. Please click on the given link to verify your phone. http://192.168.68.133:5000/api/verify/mobile/`,
//     to: "+919703534849"
// })