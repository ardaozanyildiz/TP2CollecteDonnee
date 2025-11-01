//C'est pour rajouter une saison a une serie mais sa ne fonctionne pas a 100% pour
//le moment
import { Request, Response } from 'express'
import { readData, writeData } from '../services/mediaService.js'

//Sa c'est la fonction qui permet de rajouter une saison
export const addSeasonToSerie = (req: Request, res: Response) => {
    const { serieId, seasonNumber, releaseDate } = req.body
    const data = readData()

    const serie = data.find((m: any) => m.id === serieId && m.type === 'serie')
    if (!serie) return res.status(404).json({ error: 'Série non trouvée' })

    const newSeason = {
        seasonNumber,
        releaseDate,
        episodes: []
    }

    serie.seasons.push(newSeason)
    writeData(data)
    res.status(201).json(serie)
}
