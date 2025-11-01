//Il sert uniquement à indiquer que la v1 est désactivée
import { Router } from 'express'
import router from './v2Routes'

// routes pour v1
router.get('/', (_req, res) => {
    res.json({ version: 'v1', status: 'deprecated' })
})

export default router
