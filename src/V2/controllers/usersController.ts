//Ici ya les fonctions pour les users
import { Request, Response } from 'express'
import User from '../models/User.js'
import { userNameContrainte } from '../utils/validators.js'
 
//Afficher les infos du user
export async function infosUser(req: Request, res: Response) {
  try {
    const id = (req as any).user?.id
    const user = await User.findById(id).select('-passwordHash')
    if (!user) return res.status(404).json({ message: 'Trouve pas' })
    return res.json(user)
  } catch (err) {
    return res.status(500).json({ message: 'Server erreur' })
  }
}

//Modifier des infos
export async function patchInfosUser(req: Request, res: Response) {
  try {
    const id = (req as any).user?.id
    const { username, favorites } = req.body || {}
    const update: any = {}
 
    if (username) {
      if (!userNameContrainte.test(username)) {
        return res.status(422).json({ message: 'Username est invalide' })
      }
      update.username = username
    }
 
    if (Array.isArray(favorites)) {
      update.favorites = favorites
    }
 
    const user = await User.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    }).select('-passwordHash')
 
    return res.json(user)
  } catch (err) {
    return res.status(400).json({ message: 'Invalid payload' })
  }
}
 
//Afficher un user
export async function getUserById(req: Request, res: Response) {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash')
    if (!user) return res.status(404).json({ message: 'Not found' })
    return res.json(user)
  } catch (err) {
    return res.status(400).json({ message: 'Bad id' })
  }
}