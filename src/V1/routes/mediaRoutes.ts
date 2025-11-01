//Ce fichier sert a crée et configurer toutes les routes HTTP des médias, des séries,
// des utilisateurs et des logs.

import { Router } from 'express'
import {createMedia, deleteMedia, getAllMedias, getMediaById, 
    updateMedia,} from '../controllers/mediaController.js'
import { addSeasonToSerie } from '../controllers/serieController.js'
import { getMediasByUser } from '../controllers/userController.js'
import { getLastLog } from '../controllers/loggerController.js'

import { isAdmin, validateFilm } from '../middlewares/Validation.js'

const router = Router()
//Les routes pour Users
router.get('/users/:id/medias', getMediasByUser)

//Les routes pour Logs
router.get('/logs', getLastLog)

//Les routes pour Series
router.post('/seasons', isAdmin, addSeasonToSerie)

//Les routes pour Medias
router.get('/', getAllMedias)
router.get('/:id', getMediaById)
router.post('/', isAdmin, validateFilm, createMedia)
router.put('/:id', isAdmin, validateFilm, updateMedia)
router.delete('/:id', isAdmin, deleteMedia)


export default router
