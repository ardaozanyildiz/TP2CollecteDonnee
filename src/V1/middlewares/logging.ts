import { Request, Response, NextFunction } from 'express'
import winston from 'winston'

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    //Verification
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' })
    ]
})

export const logRequest = (req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.url}`)
    next()
}

export const logError = (err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message)
    res.status(500).json({ error: 'Erreur interne', message: err.message })
}