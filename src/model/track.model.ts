import { Schema, model } from "mongoose";

interface Track {
    trackingId: string;
    opens: number;
    userIPs: string[];
}

const trackSchema = new Schema<Track>({
    trackingId: {
        type: String,
        required: true
    },
    opens: {
        type: Number,
        default: 0
    },
    userIPs: {
        type: [String],
        default: []
    }
})

const Track = model<Track>('Track', trackSchema);

export default Track