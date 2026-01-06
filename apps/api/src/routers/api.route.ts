import { Router } from 'express'
import  { authRouter } from './auth.route'
const apiRouter = Router()

apiRouter.use('/',authRouter() )

export default apiRouter