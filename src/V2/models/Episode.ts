//Ce fichier sert a decrire comment un épisode de série doit être enregistré dans la bd
//En gros on definit les regle de validation, les relation avec les autre model, etc.
import mongoose, { Schema, Document } from 'mongoose'

export interface IEpisode extends Document {
    seriesId: mongoose.Types.ObjectId
    seasonId: mongoose.Types.ObjectId
    epNo: number 
    title: string
    durationMin: number 
}

//Le shema Mongoose
const EpisodeSchema = new Schema<IEpisode>({
    seriesId: { type: Schema.Types.ObjectId, ref: 'Series', required: true },
    seasonId: { type: Schema.Types.ObjectId, ref: 'Season', required: true },
    epNo: { type: Number, min: 1, required: true },
    title: { type: String, required: true, minlength: 1, maxlength: 200 },
    durationMin: { type: Number, min: 1, max: 300, required: true }
    //Pour dire la date de creation et derniere modif. C'est automatique avec mongoose
}, { timestamps: true })

EpisodeSchema.index({ seasonId: 1, epNo: 1 }, { unique: true })
EpisodeSchema.index({ seriesId: 1 })

export default mongoose.model<IEpisode>('Episode', EpisodeSchema)