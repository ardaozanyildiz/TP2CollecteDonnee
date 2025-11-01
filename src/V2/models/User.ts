import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
    email: string
    username: string
    name?: string
    passwordHash: string
    role: 'user' | 'admin'
    //Une liste favoris
    favorites?: mongoose.Types.ObjectId[]
}

const UserSchema = new Schema<IUser>({
    //Pour email et username j'ai utilise regex pour mettre les contrainte qui faut
    email: { type: String, required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    username: { type: String, required: true, match: /^[A-Za-z0-9._-]{3,30}$/ },
    name: { type: String },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user', required: true },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Movie' }]
}, { timestamps: true })

export default mongoose.model<IUser>('User', UserSchema)