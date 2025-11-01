import { Router } from 'express'
import { loginLimiter, ratingsLimiter } from '../middlewares/rateLimit.js'
import { requireAuth, requireRole } from '../middlewares/auth.js'
import * as Auth from '../controllers/authController.js'
import * as Users from '../controllers/usersController.js'
import * as Movies from '../controllers/moviesController.js'
import * as Series from '../controllers/seriesController.js'
import * as Ratings from '../controllers/ratingsController.js'
import router from '../../V1/routes/mediaRoutes.js'


//Tout les routes pour les user et lauthentification
//-inscription-connexion-get les infos du user-modifier des infos-get id pour le admin
router.post('/auth/register', Auth.register)
router.post('/auth/login', loginLimiter, Auth.login)

router.get('/users/me', requireAuth, Users.me)
router.patch('/users/me', requireAuth, Users.patchMe)
router.get('/users/:id', requireAuth, requireRole('admin'), Users.getUserById)

//Ici cest les routes crud pour les film
//-liste de film-cree un film-prendre les infos-modifier des infos-delete
router.get('/movies', Movies.listMovies)
router.post('/movies', requireAuth, requireRole('admin'), Movies.createMovie)
router.get('/movies/:id', Movies.getMovie)
router.patch('/movies/:id', requireAuth, requireRole('admin'), Movies.patchMovie)
router.delete('/movies/:id', requireAuth, requireRole('admin'), Movies.removeMovie)

//Route pour les series
//liste de serie-cree une serie-ajouter saison-ajouter episode-lioste episode
router.get('/series', Series.listSeries)
router.post('/series', requireAuth, requireRole('admin'), Series.createSeries)
router.post('/series/:seriesId/seasons', requireAuth, requireRole('admin'), Series.createSeason)
router.post('/series/:seriesId/seasons/:seasonId/episodes', requireAuth, requireRole('admin'), Series.createEpisode)
router.get('/series/:seriesId/seasons/:seasonId/episodes', Series.listEpisodesInSeason)

//Routes pour rajouter un rating et afficher le rating aussi
router.post('/ratings', ratingsLimiter, requireAuth, Ratings.createRating)
router.get('/ratings/avg/movie/:movieId', Ratings.avgMovie)
router.get('/ratings/avg/series/:seriesId', Ratings.avgSeries)

export default router

