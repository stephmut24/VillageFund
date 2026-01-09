import app from "./server"
import {configs} from "./config"
import { connectToDb } from './database';


const start = async () => {
  await connectToDb();

  app.listen(configs.port, () => {
    console.log(`🚀 Server running on port ${configs.port}`);
  });
};

start();