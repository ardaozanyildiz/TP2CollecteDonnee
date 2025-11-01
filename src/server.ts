//Ce fichier sert a demarrer le serveur

import app from './app.js'
//Pour lire default.json
import configPkg from 'config'

const config = configPkg as any
const port: number = config.get('server.http.port')

app.listen(port, () => {
console.log(`[server] HTTP workin on :${port} (${process.env.NODE_ENV})`)
})

