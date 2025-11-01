import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import configPkg from 'config'
import User, { IUser } from '../models/User.js'
import { emailContrainte, userNameContrainte } from '../utils/validators.js'

const config = configPkg as any

function isStrongPassword(pw: string): boolean {
    if (typeof pw !== 'string') return false
    return (
        pw.length >= 8 &&
        /[a-z]/.test(pw) &&
        /[A-Z]/.test(pw) &&
        /\d/.test(pw) &&
        /[^A-Za-z0-9]/.test(pw)
    )
}

export async function register(req: Request, res: Response) {
    try {
        const { email, username, password } = req.body || {}

        if (!emailContrainte.test(email || '')) {
            return res.status(400).json({ message: 'Email est invalide' })
        }

        if (!userNameContrainte.test(username || '')) {
            return res.status(400).json({ message: 'Username est invalide' })
        }

        if (!isStrongPassword(password)) {
            return res.status(400).json({ message: 'Le password est faible' })
        }

        const exists = await User.findOne({ email })
        if (exists) {
            return res.status(409).json({ message: 'Email deja utiliser' })
        }

        const passwordHash = await bcrypt.hash(password, 10)
        const user = await User.create({ email, username, passwordHash, role: 'user' })

        const obj = user.toObject()
        delete (obj as any).passwordHash

        return res.status(201).json(obj)
    } catch (err) {
        return res.status(500).json({ message: 'Server erreur' })
    }
}

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body || {}
        const user = await User.findOne({ email })

        if (!user) {   
            return res.status(401).json({ message: 'Invalide credentials' })
        }

        const ok = await bcrypt.compare(password || '', user.passwordHash)
        if (!ok) {
            return res.status(401).json({ message: 'Invalide credentials' })
        }

        const id = (user as IUser)._id?.toString?.() ?? String((user as any)._id)

        const secret = config.get('security.jwt.secret')
        const expiresIn = config.get('security.jwt.expiresIn')
        const token = jwt.sign({ id, role: user.role }, secret, { expiresIn })

        return res.json({ token })
    } catch (err) {
        return res.status(500).json({ message: 'Server erreur' })
    }
}
