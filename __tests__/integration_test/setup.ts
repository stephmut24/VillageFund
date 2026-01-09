import { config as dotenv } from "dotenv";
dotenv();
import { afterAll, beforeAll} from "@jest/globals"
import {Sequelize} from "sequelize";
import { databaseConnection } from "../../src/config";


let sequelize: Sequelize 


beforeAll(async () =>{
    process.env.NODE_ENV = "test"

    const config = databaseConnection();

    sequelize = new Sequelize({
        username: config.username as string,
        password: config.password as string,
        database: config.database as string,
        port: Number(config.port),
        dialect: "postgres",
    });
    await sequelize.authenticate();
    console.log("DB Connected for tests")
    
})


afterAll(async () =>{
    if (sequelize) {
        await sequelize.close()
        console.log("DB connection closed")
    }

})


