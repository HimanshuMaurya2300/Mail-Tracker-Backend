import { Hono } from "hono";
import { v4 as uuidv4 } from 'uuid';
import Track from "../model/track.model";
import { sendMail } from "../utils/sendMail";

const app = new Hono();

app.post("/send-mail", async (c) => {

    const { emails, password } = await c.req.json();

    if (!emails || !password) {
        return c.json({
            success: false,
            message: "Email and password are required"
        })
    }

    if (password !== process.env.PASSWORD) {
        return c.json({
            success: false,
            message: "Invalid password"
        })
    }

    // send-mail
    const trackingId = uuidv4();

    try {
        await Track.create({ trackingId })
        await sendMail(emails, trackingId)

        return c.json({
            success: true,
            trackingId: trackingId,
            message: "Email sent successfully"
        })
    } catch (error) {
        console.log(error)
        return c.json({
            success: false,
            message: "failed to send email"
        })
    }

})

export default app