import { getConnInfo } from "@hono/node-server/conninfo";
import { Hono } from "hono";
import Track from "../model/track.model";
import { promises as fs } from "fs";

const app = new Hono();

let imageBuffer: Buffer;
(
    async () => {
        try {
            imageBuffer = await fs.readFile(__dirname + '/assets/img.jpeg')
        } catch (error) {
            console.log(error)
        }
    }
)();


app.get("/track-mail/:id", async (c) => {

    const id = c.req.param("id");

    const userIP = c.req.raw.headers.get('true-client-ip') ||
        c.req.raw.headers.get('cf-connecting-ip') ||
        getConnInfo(c).remote.address || '0.0.0.0';

    if (!id) {
        return c.json({
            success: false,
            message: "Tracking ID is required"
        })
    }

    try {
        const track = await Track.findOne({ trackingId: id });

        if (!track) {
            return c.json({
                success: false,
                message: "Tracking ID not found"
            })
        }

        if (!track.userIPs.includes(userIP)) {
            track.userIPs.push(userIP);
            track.opens++;
            await track.save();
        }

        return new Response(imageBuffer, {
            headers: {
                'Content-Type': 'image/jpeg',
                'Content-Length': imageBuffer.length.toString()
            }
        })

    } catch (error) {
        console.log(error)
        return c.json({
            success: false,
            message: "failed to track email"
        })
    }
})

export default app