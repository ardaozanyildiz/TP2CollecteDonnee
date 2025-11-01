//Pour dire quelle site a acces au api
import cors from 'cors'
import configPkg from 'config'
import { Express } from 'express'

export function permissionCors(app: Express) {
    const config = configPkg as any
    const origins: string[] = config.get('security.cors.origins')
    app.use(cors({ origin: origins }))
}
