export type TPieceType = 'red' | 'black';

export type TDatabaseConfigAttributes = {
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: number | string;
  dialect?: string;
  urlDatabase?: string;
  logging?: boolean;
  autoLoadEntities?: boolean;
  synchronize?: boolean;
};

export type TDatabaseConfig = {
  development: TDatabaseConfigAttributes;
  test: TDatabaseConfigAttributes;
  production: TDatabaseConfigAttributes;
};
