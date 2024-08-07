import { createTransport } from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const transport = createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
})

export const sendMail = async (emails: string[], trackingId: string) => {

    const trackingURL = `${process.env.BASE_URL}/track/track-mail/${trackingId}`

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: emails,
        subject: 'Tracking dead pixel ID',
        html: `
            <h1>Tracking ID : ${trackingId}</h1>
            <img 
                src="${trackingURL}" 
                alt="dead pixel"
            />
        `
    }

    try {
        await transport.sendMail(mailOptions)
    } catch (error) {
        console.log(error)
        throw new Error('Failed to send email')
    }
}