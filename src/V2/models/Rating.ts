import mongoose, { Schema, Document } from 'mongoose'

export type RatingTarget = 'movie' | 'episode'

export interface IRating extends Document {
    userId: mongoose.Types.ObjectId
    target: RatingTarget
    targetId: mongoose.Types.ObjectId
    score: number 
    review?: string
}

const RatingSchema = new Schema<IRating>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    target: { type: String, enum: ['movie', 'episode'], required: true },
    targetId: { type: Schema.Types.ObjectId, required: true },
    score: { type: Number, min: 0, max: 10, required: true },
    review: { type: String, maxlength: 2000 }
}, { timestamps: true })

RatingSchema.index({ targetId: 1 })

export default mongoose.model<IRating>('Rating', RatingSchema)