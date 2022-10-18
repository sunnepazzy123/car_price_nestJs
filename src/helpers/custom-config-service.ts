import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config();

export interface IENV {
    [key: string]: string | undefined
}

export class ConfigServiceCustom {

  constructor(private env: IENV) { }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('NODE_ENV', false);
    return mode != 'development';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions{
    return {
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      entities: ['**/*.entity{.ts,.js}'],
      migrationsTableName: 'migration',
      migrations: ['src/migration/*.ts'],
    //@ts-ignore
      cli: {
        migrationsDir: 'src/migration',
      },
      ssl: this.isProduction(),
    };
  }

}

export const APP_ENV = [
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
  'JWT_SECRET',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_SECRET',
  'CALL_BACK_URI'
] 

export const APP_ENV_DEV = [
  'JWT_SECRET',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_SECRET',
  'CALL_BACK_URI'
] 

export const configService = new ConfigServiceCustom(process.env)
  

