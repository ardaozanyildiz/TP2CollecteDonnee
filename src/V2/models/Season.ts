import mongoose, { Schema, Document } from 'mongoose'

export interface ISeason extends Document {
    seriesId: mongoose.Types.ObjectId
    seasonNo: number 
    episodes: number 
}

const SeasonSchema = new Schema<ISeason>({
    seriesId: { type: Schema.Types.ObjectId, ref: 'Series', required: true },
    seasonNo: { type: Number, min: 1, required: true },
    episodes: { type: Number, min: 0, default: 0 }
}, { timestamps: true })

SeasonSchema.index({ seriesId: 1, seasonNo: 1 }, { unique: true })

export default mongoose.model<ISeason>('Season', SeasonSchema)