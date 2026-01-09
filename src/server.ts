import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { config as Dotenv } from 'dotenv';
Dotenv();
import { configs, swaggerDocument } from './config';

import { errorHandler, applyRateLimit } from './middlewares';
import mainRoute from './routes';

const app: Express = express();


    // security middleware
    app.use(helmet());
    app.use(cors());

    // rate limit
    applyRateLimit(app);

    // body parsing
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // database connection
    

    // ✅ AJOUTEZ CES ROUTES AVANT LES AUTRES
    
    // 1. Route racine
    app.get('/', (req: Request, res: Response) => {
      res.status(200).json({
        success: true,
        message: '🚀 VillageFund API is running',
        version: '1.0.0',


      });
    });

    // 2. Route de santé globale
    app.get('/health', (req: Request, res: Response) => {
      res.status(200).json({
        success: true,
        status: 'healthy',
        
      });
    });

   
  

    // swagger documentation avec gestion d'erreur TypeScript
 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 

    // routes principales
    app.use(configs.prefix, mainRoute);

    // ✅ AJOUTEZ UN HANDLER 404
    app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});
    ;

  
    app.use(errorHandler);
   

export default app;

// import express, { Express } from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import swaggerUi from 'swagger-ui-express';
// import { config as Dotenv } from 'dotenv';
// Dotenv();
// import { configs, swaggerDocument } from './config';
// import { connectToDb } from './database';
// import { errorHandler, applyRateLimit } from './middlewares';
// import mainRoute from './routes';

// const app: Express = express();

// const startApp = async () => {
//   try {
//     // security middleware
//     app.use(helmet());
//     app.use(cors());

//     // rate limit
//     applyRateLimit(app);

//     // body parsing
//     app.use(express.json());
//     app.use(express.urlencoded({ extended: true }));

//     // database connection
//     await connectToDb();

//     // swagger documentation
//     app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//     // routes
//     app.use(configs.prefix, mainRoute);

//     // error handler
//     app.use(errorHandler);

//     // app.listen(configs.port, () => {
//     //   console.log(`Server running on port ${configs.port}`);
//     //   console.log(
//     //     `API documentation: http://localhost:${configs.port}/api-docs`,
//     //   );
//     // });
//   } catch (error) {
//     console.log('Error starting: ', error);
//   }
// };

// startApp();

// export default app;
