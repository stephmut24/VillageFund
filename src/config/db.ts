interface DatabaseConfig {
  database: string;
  username: string;
  password: string;
  port?: number;
}

const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

const prefixConf = (): 'DEV' | 'TEST' | 'PROD' => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return 'DEV';
    case 'testing':
      return 'TEST';
    case 'production':
      return 'PROD';
    default:
      return 'DEV';
  }
};

export const databaseConnection = (): DatabaseConfig => {
  const prefix = prefixConf();

  return {
    database: getEnv(`DB_${prefix}_NAME`),
    username: getEnv(`DB_${prefix}_USERNAME`),
    password: getEnv(`DB_${prefix}_PASSWORD`),
    port: Number(process.env[`DB_${prefix}_PORT`]) || 5432,
  };
};
