import express, { Router } from 'express';
import userRoute from './users';
import authRoute from './auth';
import AvecRoute from './avec';
import CycleRoute from './cycle';

const mainRoute: Router = express.Router();

mainRoute.use('/users', userRoute);
mainRoute.use('/auth', authRoute);
mainRoute.use('/avec', AvecRoute);
mainRoute.use('/cycle', CycleRoute)

export default mainRoute;
