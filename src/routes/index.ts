import express, {Router} from 'express'
import userRoute from './users';
import authRoute from './auth';


const mainRoute: Router = express.Router()

mainRoute.use('/users', userRoute)
mainRoute.use('/auth', authRoute)

export default mainRoute;