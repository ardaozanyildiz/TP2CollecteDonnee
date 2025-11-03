//Organise les affaires avant le lancement du serveurs
import express from 'express'
import configPkg from 'config'
import swaggerUi from 'swagger-ui-express'
import { connectDb } from './db/connection.js'
import { errorHandler } from './V2/middlewares/error.js'
import v1Routes from './V2/routes/v1Routes.js'
import v2Routes from './V2/routes/v2Routes.js'
import { permissionCors } from './V2/middlewares/cors.js'
import path from 'path'

const config = configPkg as any
const app = express()


//Permettre de lire json, afficher les requetes http,etc et aussi connecter la bd
app.set('trust proxy', !!config.get('server.trustProxy'))
app.use(express.json())
permissionCors(app)
connectDb(config.get('db.uri'))

//Pour la documentation swagger
import { readFileSync } from 'fs'
const swaggerV1 = JSON.parse(readFileSync(path.join(process.cwd(), 'src', 'docs', 'swagger-v1.json'), 'utf8'))
const swaggerV2 = JSON.parse(readFileSync(path.join(process.cwd(), 'src', 'docs', 'swagger-v2.json'), 'utf8'))
app.use('/docs/v1', (swaggerUi.serve as any), swaggerUi.setup(swaggerV1) as any)
app.use('/docs/v2', (swaggerUi.serve as any), swaggerUi.setup(swaggerV2) as any)


app.use('/api/v1', v1Routes)
app.use('/api/v2', v2Routes)

//Pour renvoyer une erreur
app.use(errorHandler)

export default app
