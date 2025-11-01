// /Ici on reçoit les requêtes HTTP venant des routes et parle aux services pour lire/écrire dans db.json
import { Request, Response } from 'express'
import { Film } from '../models/Film.js'
import { readData, writeData } from '../services/mediaService.js'

//Retourner tous les médias
export const getAllMedias = (req: Request, res: Response) => {
    const data = readData()
    const { type, genre, year } = req.query
  
    if (!type && !genre && !year) {
      return res.json(data)
    }
  
    const filtered = data.filter((item: any) => {
      return (
        (!type || item.type?.toLowerCase() === type.toString().toLowerCase()) &&
        (!genre || item.genre?.toLowerCase() === genre.toString().toLowerCase()) &&
        (!year || String(item.year) === String(year))
      )
    })
  
    res.json(filtered)
  }

//Retourner un média selon son id
export const getMediaById = (req: Request, res: Response) => {
  const data = readData()
  const media = data.find((m: any) => m.id === req.params.id)
  if (!media) return res.status(404).json({ error: 'Non trouvé' })
  res.json(media)
}


//Créer un nouveau média et l’ajouter dans db.json
export const createMedia = (req: Request, res: Response) => {
  const data = readData() 

  const id = (data.length ? Math.max(...data.map((m: any) => parseInt(m.id))) + 1 : 1).toString()
//On crée un nouvel objet Film avec les données envoyées par le client dans req.body
//En gros cest pour faire un post
  const film = new Film(
    id, 
    req.body.title,
    req.body.genre,
    req.body.year, 
    req.body.rating,
    req.body.userId,
    req.body.duration,
    req.body.watched 
  )
//On ajoute le film à la liste
  data.push(film)
  writeData(data)
  res.status(201).json(film)
}

//Supprimer un média par id
export const deleteMedia = (req: Request, res: Response) => {
  let data = readData()
  const id = req.params.id 

  const before = data.length

    data = data.filter((m: any) => m.id !== id)
    if (data.length === before) return res.status(404).json({ error: 'Non trouvé' })
    writeData(data)
    res.status(204).send()
}

//On modifie un objet
export const updateMedia = (req: Request, res: Response) => {
    const data = readData()
    const id = req.params.id
  
    const index = data.findIndex((m: any) => m.id === id)
    if (index === -1) return res.status(404).json({ error: 'Média non trouvé' })
  
    data[index] = { ...data[index], ...req.body }
  
    writeData(data)
    res.json(data[index])
  }
  