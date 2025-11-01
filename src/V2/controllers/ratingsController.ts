import { Request, Response } from 'express'
import mongoose from 'mongoose'
import Rating from '../models/Rating.js'
import Episode from '../models/Episode.js'

// Créer une note (target = 'movie' ou 'episode')
export async function createRating(req: Request, res: Response) {
    try {
        const { target, targetId, score, review } = req.body || {}

        if (target !== 'movie' && target !== 'episode') {
            return res.status(400).json({ message: 'Invalid target' })
        }

        const userId = (req as any).user?.id
        const doc = await Rating.create({ userId, target, targetId, score, review })

        return res.status(201).json(doc)
    } catch (err) {
        return res.status(400).json({ message: 'Invalid payload' })
    }
}

// Moyenne et compteur des notes d’un film
export async function avgMovie(req: Request, res: Response) {
    try {
        const movieId = req.params.movieId

        const data = await Rating.aggregate([
            { $match: { target: 'movie', targetId: new mongoose.Types.ObjectId(movieId) } },
            { $group: { _id: '$targetId', avg: { $avg: '$score' }, count: { $sum: 1 } } },
            { $project: { _id: 0, avg: 1, count: 1 } },
        ])

        return res.json(data[0] || { avg: null, count: 0 })
    } catch (err) {
        return res.status(400).json({ message: 'Bad id' })
    }
}

// Moyenne et compteur des notes pour une série (en se basant sur les épisodes de la série)
export async function avgSeries(req: Request, res: Response) {
    try {
        const seriesId = req.params.seriesId

        const data = await Rating.aggregate([
            { $match: { target: 'episode' } },
            {
                $lookup: {
                    from: 'episodes',
                    localField: 'targetId',
                    foreignField: '_id',
                    as: 'ep',
                },
            },
            { $unwind: '$ep' },
            { $match: { 'ep.seriesId': new mongoose.Types.ObjectId(seriesId) } },
            { $group: { _id: '$ep.seriesId', avg: { $avg: '$score' }, count: { $sum: 1 } } },
            { $project: { _id: 0, avg: 1, count: 1 } },
        ])

        return res.json(data[0] || { avg: null, count: 0 })
    } catch (err) {
        return res.status(400).json({ message: 'Mauvais id' })
    }
}
