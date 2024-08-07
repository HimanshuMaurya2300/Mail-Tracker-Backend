import {Hono} from 'hono'
import Track from '../model/track.model';

const app = new Hono();

app.get('/get-mail-status/:id', async(c) => {

    const id = c.req.param('id')

    if(!id){
        return c.json({
            status: false,
            message: 'Tracking ID is required'
        })
    }

    try {
        const track = await Track.findOne({trackingId: id})

        if(!track){
            return c.json({
                status: false,
                message: 'Tracking ID not found'
            })
        }

        return c.json({
            status: true,
            message: 'Success',
            data: track
        })

    } catch (error) {
        console.log(error)
        return c.json({
            status: false,
            message: 'Failed to get mail status'
        })
    }
})


export default app;