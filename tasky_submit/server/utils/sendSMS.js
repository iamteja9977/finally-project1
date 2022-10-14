import twilio from 'twilio';
import config from "config";

const { TWILIO_SID, TWILIO_TOKEN, TWILIO_NUMBER } = config.get("SEND_SMS");

const accountSid = TWILIO_SID;
const authToken = TWILIO_TOKEN;
const client = new twilio(accountSid, authToken);

// let sendSmsObject = {
//     body: 'Bhai, Jawab nai diye',
//     to: '+919394804040'
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

