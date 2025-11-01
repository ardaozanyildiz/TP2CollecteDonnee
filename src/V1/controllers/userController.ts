//Ce fichier sert à retourner tous les médias associés à un utilisateur donné
import { Request, Response } from 'express'
import { readData, writeData } from '../services/mediaService.js'

//Sert a donner les infos sur un id specifique
export const getMediasByUser = (req: Request, res: Response) => {
    const data = readData()
    const userId = req.params.id
    const medias = data.filter((m: any) => m.userId === userId)
  
    res.json(medias)
  }
  