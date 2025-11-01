//Tout les utils qui me sert a mettre des contraintes
export const emailContrainte = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const userNameContrainte = /^[A-Za-z0-9._-]{3,30}$/
export const titreContrainte = (s: string) => s.length >= 1 && s.length <= 200
export const isString = (v: unknown): v is string => typeof v === 'string'
export const inRange = (n: number, min: number, max: number) => n >= min && n <= max
//A revoir celui la
//Nettoie un texte pour enlever les balises HTML
export const sanitizeReview = (s?: string) => (s || '').replace(/<[^>]*>/g, '') // retire HTML

