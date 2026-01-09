
const dotenv = require("dotenv");
dotenv.config();

const prefixConfig = () => {
  const env = process.env.NODE_ENV || "development";
  var pref;
  switch (env) {
    case "development":
      pref = "DEV";
      break;
    case "produciton":
      pref = "PROD";
      break;
    case "test":
      pref = "TEST";
      break;
    default:
      pref = "DEV";
  }
  return pref;
};

const databaseConnection = () => {
  const prefix = prefixConfig();
  return {
    database: process.env[`DB_${prefix}_NAME`],
    password: process.env[`DB_${prefix}_PASSWORD`],
    username: process.env[`DB_${prefix}_USERNAME`],
    port: process.env[`DB_${prefix}_PORT`],
    dialect: process.env[`DB_${prefix}_DIALECT`],
  };
};

module.exports = databaseConnection;

// require('dotenv/config');

// /**
//  * Database configuration for sequelize CLI migrations
//  */



// const getConfig = (env) => {
//   let prefix;

//    if (env === 'development' || env === 'dev') {
//     prefix = 'DEV';
//   } else if (env === 'test' || env === 'testing') {
//     prefix = 'TEST'; // Les deux 'test' et 'testing' utilisent TEST
//   } else if (env === 'production' || env === 'prod') {
//     prefix = 'PROD';
//   } else {
//     prefix = 'DEV';
//   }


//   console.log(`=== Config for ${env} (prefix: ${prefix}) ===`);

//   // switch (env) {
//   //   case 'development':
//   //     prefix = 'DEV';
//   //     break;
//   //   case 'testing':
//   //     prefix = 'TEST';
//   //     break;
//   //   case 'production':
//   //     prefix = 'PROD';
//   //     break;
//   //   default:
//   //     prefix = 'DEV';
//   //     break;
//   // }

  

//   // return {
//   //   username: process.env[`DB_${prefix}_USERNAME`],
//   //   password: process.env[`DB_${prefix}_PASSWORD`],
//   //   database: process.env[`DB_${prefix}_NAME`],
//   //   host: 'localhost',
//   //   port: Number(process.env[`DB_${prefix}_PORT`]) || 5432,
//   //   dialect: process.env[`DB_${prefix}_DIALECT`] || 'postgres',
//   //   logging: false,
//   // };
//   const config = {
//     username: process.env[`DB_${prefix}_USERNAME`],
//     password: process.env[`DB_${prefix}_PASSWORD`],
//     database: process.env[`DB_${prefix}_NAME`],
//     host: 'localhost',
//     port: Number(process.env[`DB_${prefix}_PORT`]) || 5432,
//     dialect: process.env[`DB_${prefix}_DIALECT`] || 'postgres', // fallback explicite
//     logging: false,
//   };

//   console.log(`Final dialect: ${config.dialect}`);
//   console.log('========================\n');

//   return config;

// };

// module.exports = {
//   development: getConfig('development'),
//   test: getConfig('test'),
//   production: getConfig('production'),
// };

// // const prefixConf = () => {
// //   const prefixEnv = process.env.NODE_ENV || 'development';
// //   let prefix;
// //   switch (prefixEnv) {
// //     case 'development':
// //       prefix = 'DEV';
// //       break;
// //     case 'testing':
// //       prefix = 'TEST';
// //       break;
// //     case 'production':
// //       prefix = 'PROD';
// //       break;
// //     default:
// //       prefix = 'DEV';
// //       break;
// //   }
// //   return prefix;
// // };

// // const prefix = prefixConf();

// // module.exports = {
// //   development: {
// //     username: process.env[`DB_${prefix}_USERNAME`],
// //     password: process.env[`DB_${prefix}_PASSWORD`],
// //     database: process.env[`DB_${prefix}_NAME`],
// //     host: 'localhost',
// //     port: Number(process.env[`DB_${prefix}_PORT`]) || 5432,
// //     dialect: 'postgres',
// //     logging: false,
// //   },

// //   test: {
// //     username: process.env[`DB_${prefix}_USERNAME`],
// //     password: process.env[`DB_${prefix}_PASSWORD`],
// //     database: process.env[`DB_${prefix}_NAME`],
// //     host: 'localhost',
// //     port: Number(process.env[`DB_${prefix}_PORT`]) || 5432,
// //     dialect: 'postgres',
// //     logging: false,
// //   },

// //   production: {
// //     username: process.env[`DB_${prefix}_USERNAME`],
// //     password: process.env[`DB_${prefix}_PASSWORD`],
// //     database: process.env[`DB_${prefix}_NAME`],
// //     host: process.env.DB_PROD_HOST || 'localhost',
// //     port: Number(process.env[`DB_${prefix}_PORT`]) || 5432,
// //     dialect: 'postgres',
// //     logging: false,
// //     pool: {
// //       max: 5,
// //       min: 0,
// //       acquire: 30000,
// //       idle: 10000,
// //     },
// //   },
// // };
