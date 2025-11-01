//Mongoose pour communiquer avec mongo db
//Shema pour definir la structure
//Et document pour typer le model(id)
import mongoose, { Schema, Document } from 'mongoose'

export interface ISeries extends Document {
    title: string
    genres: string[]
    //Sa cest pour dire que cest un des deux possibilites
    status: 'ongoing' | 'ended'
}

const SeriesSchema = new Schema<ISeries>({
    title: { type: String, required: true, minlength: 1, maxlength: 200 },
    genres: { type: [String], default: [], validate: (v: string[]) => v.every((s: string) => s.length >= 1 && s.length <= 30) },
    status: { type: String, enum: ['ongoing', 'ended'], default: 'ongoing' }
}, { timestamps: true })

SeriesSchema.index({ title: 'text', genres: 1 })

export default mongoose.model<ISeries>('Series', SeriesSchema)