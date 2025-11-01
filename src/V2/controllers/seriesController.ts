import { Request, Response } from 'express'
import Series from '../models/Series.js'
import Season from '../models/Season.js'
import Episode from '../models/Episode.js'

export async function listSeries(req: Request, res: Response) {
    try {
        const { title, genre, status } = req.query as Record<string, string>
        const q: any = {}

        if (title) q.title = { $regex: String(title), $options: 'i' }
        if (genre) q.genres = { $in: [String(genre)] }
        if (status) q.status = String(status)

        const items = await Series.find(q)
        return res.json(items)
    } catch (err) {
        return res.status(500).json({ message: 'Server erreur' })
    }
}

export async function createSeries(req: Request, res: Response) {
    try {
        const doc = await Series.create(req.body)
        return res.status(201).json(doc)
    } catch (err) {
        return res.status(400).json({ message: 'Invalid payload' })
    }
}

export async function createSeason(req: Request, res: Response) {
    try {
        const { seriesId } = req.params
        const body = { ...req.body, seriesId }
        const season = await Season.create(body)
        return res.status(201).json(season)
    } catch (err) {
        return res.status(400).json({ message: 'Invalid payload' })
    }
}

export async function createEpisode(req: Request, res: Response) {
    try {
        const { seriesId, seasonId } = req.params
        const body = { ...req.body, seriesId, seasonId }
        const ep = await Episode.create(body)
        return res.status(201).json(ep)
    } catch (err) {
        return res.status(400).json({ message: 'Invalid payload' })
    }
}

export async function listEpisodesInSeason(req: Request, res: Response) {
    try {
        const { seasonId } = req.params
        const { minDuration } = req.query as Record<string, string>

        const q: any = { seasonId }
        if (minDuration) q.durationMin = { $gte: Number(minDuration) }

        const items = await Episode.find(q)
        return res.json(items)
    } catch (err) {
        return res.status(400).json({ message: 'Bad id or query' })
    }
}
