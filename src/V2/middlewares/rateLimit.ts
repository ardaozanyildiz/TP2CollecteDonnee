import rateLimit from 'express-rate-limit'

//Mettre une limite de requetes pour eviter les spam
export const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20 })
export const ratingsLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })
