import {Database, appSchema, tableSchema} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {
  UsersScheme,
  CustomersScheme,
  CustomersSchemeName,
  UsersSchemeName,
} from '@/schemes';
import {UsersModel, CustomersModel, Migrations} from '@/models';

const schemeVersion = 1;

export const schema = appSchema({
  version: schemeVersion,
  tables: [tableSchema(UsersScheme), tableSchema(CustomersScheme)],
});

export const adapter = new SQLiteAdapter({
  schema,
  dbName: 'WatermelonDemo', // optional database name or file system path
  migrations: Migrations, // optional migrations
  jsi: false,
});

const databaseOptions = {
  adapter,
  modelClasses: [UsersModel, CustomersModel],
  actionsEnabled: true,
};

export default class Service extends Database {
  private readonly schemeNames: string[];
  private readonly schemeVersion: number;
  constructor() {
    super(databaseOptions);
    this.schemeNames = [CustomersSchemeName, UsersSchemeName];
    this.schemeVersion = schemeVersion;
  }
}
