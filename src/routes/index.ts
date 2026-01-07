import express, { Router } from 'express';
import userRoute from './users';
import authRoute from './auth';
import AvecRoute from './avec';

const mainRoute: Router = express.Router();

mainRoute.use('/users', userRoute);
mainRoute.use('/auth', authRoute);
mainRoute.use('/avec', AvecRoute);

export default mainRoute;
