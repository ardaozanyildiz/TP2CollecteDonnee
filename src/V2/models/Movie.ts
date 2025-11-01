//Document cest juste pour un type pour dire ceci est un document mongoose
import mongoose, { Schema, Document } from 'mongoose'

export interface IMovie extends Document {
    title: string
    genres: string[]
    //?=optionel
    synopsis?: string
    releaseDate?: Date
    durationMin: number 
}

const MovieSchema = new Schema<IMovie>({
    title: { type: String, required: true, minlength: 1, maxlength: 200 },
    genres: { type: [String], default: [], validate: (v: string[]) => v.every((s: string) => s.length >= 1 && s.length <= 30) },
    synopsis: { type: String },
    releaseDate: { type: Date },
    durationMin: { type: Number, min: 1, max: 600, required: true }
}, { timestamps: true })

MovieSchema.index({ title: 'text', genres: 1 })

export default mongoose.model<IMovie>('Movie', MovieSchema)