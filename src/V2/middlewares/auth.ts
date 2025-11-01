//Verifie si le token est valide et le role du user
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import configPkg from 'config'

export interface informationJWT { id: string; role: 'user' | 'admin' }

//Verifie la presence dun token
export function requireAuth(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : ''
    if (!token) return res.status(401).json({ message: 'Token manquante' })
    try {
        const config = configPkg as any
        const decoded = jwt.verify(token, config.get('security.jwt.secret')) as informationJWT
            ; (req as any).user = decoded
        next()
    } catch {
        return res.status(401).json({ message: 'Le token nest pas valide' })
    }
}

//Verifie lacces users
export function requireRole(role: 'admin' | 'user') {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user as informationJWT | undefined
        if (!user) return res.status(401).json({ message: 'Pas autorisé' })
        if (role === 'admin' && user.role !== 'admin') return res.status(403).json({ message: 'Interdit' })
        next()
    }
}
