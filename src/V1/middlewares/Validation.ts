import { Request, Response, NextFunction } from 'express'

export function validateFilm(req: Request, res: Response, next: NextFunction) {
  const { title, genre, year, rating, duration, watched } = req.body

  //A-Z
  const regexTitle = /^[A-Za-z0-9 ]+$/
  //-/
  const regexGenre = /^[A-Za-z0-9 \-]+$/
  //""
  const regexNumber = /^[0-9]+$/

  const currentYear = new Date().getFullYear()
  if (!title || !regexTitle.test(title)) {
    return res.status(400).json({ error: 'Title invalide' })
  }

  if (!genre || !regexGenre.test(genre)) {
    return res.status(400).json({ error: 'Genre invalide' })
  }

  if (!year || year > currentYear) {
    return res.status(400).json({ error: "L'année ne peut pas être dans le futur" })
  }

  if (!rating || !regexNumber.test(rating.toString())) {
    return res.status(400).json({ error: 'Rating invalide' })
  }

  if (!duration || !regexNumber.test(duration.toString())) {
    return res.status(400).json({ error: 'Durée invalide' })
  }
  // watched est optionnel, pas besoin de valider si absent
  next()
}
    export function isAdmin(req: Request, res: Response, next: NextFunction) {
        const role = req.headers['x-user-role']
        if (role !== 'admin') {
            return res.status(403).json({ error: 'Accès interdit, admin requis' })
        }
        next()
}