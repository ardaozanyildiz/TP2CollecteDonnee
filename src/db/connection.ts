//Pour ce connecter a la bd mongodb
import mongoose from 'mongoose'

export async function connectDb(uri: string) {
    try {
        await mongoose.connect(uri)
        console.log('Mongodb bd connexion reussi')
    } catch (err) {
        console.error('Mongodb connexion erreur', err)
        process.exit(1)
    }
}
