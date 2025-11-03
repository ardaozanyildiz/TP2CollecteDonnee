//Pour gerer les films afficher, supprimer, rajouter, edit, etc
import { Request, Response } from 'express'
import Movie from '../models/Movie.js'

export async function listMovies(req: Request, res: Response) {
    try {
        const { title, genre, minYear, maxDur, page = '1', limit = '10' } =
            req.query as Record<string, string>

        const q: any = {}

        if (title) q.title = { $regex: String(title), $options: 'i' }
        if (genre) q.genres = { $in: [String(genre)] }
        if (minYear) q.releaseDate = { $gte: new Date(Number(minYear), 0, 1) }
        if (maxDur) q.durationMin = { $lte: Number(maxDur) }

        const p = Math.max(1, Number(page))
        const l = Math.min(100, Math.max(1, Number(limit)))

        const [items, total] = await Promise.all([
            Movie.find(q).skip((p - 1) * l).limit(l).exec(),
            Movie.countDocuments(q),
        ])

        const pages = Math.max(1, Math.ceil(total / l))
        return res.json({ items, total, page: p, pages })
    } catch (err) {
        return res.status(500).json({ message: 'Server erreur' })
    }
}

export async function createMovie(req: Request, res: Response) {
    try {
        const doc = await Movie.create(req.body)
        return res.status(201).json(doc)
    } catch (err) {
        return res.status(400).json({ message: 'Invalid payload' })
    }
}

export async function getMovie(req: Request, res: Response) {
    try {
        const doc = await Movie.findById(req.params.id)
        if (!doc) return res.status(404).json({ message: 'Trouve pas' })
        return res.json(doc)
    } catch (err) {
        return res.status(400).json({ message: 'Bad id' })
    }
}

export async function patchMovie(req: Request, res: Response) {
    try {
        const doc = await Movie.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
        if (!doc) return res.status(404).json({ message: 'Trouve pas' })
        return res.json(doc)
    } catch (err) {
        return res.status(400).json({ message: 'Invalid payload or id' })
    }
}

export async function removeMovie(req: Request, res: Response) {
    try {
        await Movie.findByIdAndDelete(req.params.id)
        return res.status(204).send()
    } catch (err) {
        return res.status(400).json({ message: 'Mauvais id' })
    }
}
