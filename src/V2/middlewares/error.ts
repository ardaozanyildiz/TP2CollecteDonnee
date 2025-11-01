//Pour gerer les erreur et le renvoyer au client
import { NextFunction, Request, Response } from 'express'

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
    console.error('Erreur', err)
    const status = err.status || 500
    res.status(status).json({ message: err.message, code: status, details: err.details })
}
