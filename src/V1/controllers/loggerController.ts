//Permet le renvoie de la dernière ligne du fichier de logs
import { Request, Response } from 'express'

import fs from 'fs'
import path from 'path'

export const getLastLog = (req: Request, res: Response) => {
  const logPath = path.join(__dirname, '../../logs/combined.log')

  try {
    const logs = fs.readFileSync(logPath, 'utf-8').trim().split('\n')
    const last = logs[logs.length - 1]
    res.send(last)
  } catch (e) {
    res.status(500).json({ error: 'Impossible de lire les logs' })
  }
}
