interface ServerInterface {
  port: number;
  prefix: string;
  jwtSecret: string;
  jwtExpiresIn: string;
}

export const configs: ServerInterface = {
  port: Number(process.env.PORT),
  prefix: String(process.env.PREFIX),

  jwtSecret: process.env.JWT_SECRET || 'your-default-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
};

export * from './db';
export * from './sequelize';
export * from './swagger';
