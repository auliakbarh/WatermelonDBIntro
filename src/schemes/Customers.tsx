import {TableSchemaSpec} from '@nozbe/watermelondb/Schema';

export const name = 'customers';
export type Customers = {
  about: 'string';
  address: 'string';
  age: 'number';
  balance: 'string';
  company: 'string';
  email: 'string';
  eyeColor: 'string';
  favoriteFruit: 'string';
  gender: 'string';
  greeting: 'string';
  guid: 'string';
  index: 'number';
  isActive: 'boolean';
  latitude: 'number';
  longitude: 'number';
  name: 'string';
  phone: 'string';
  picture: 'string';
  registered: 'string';
  _id: 'string';
};

const schema: TableSchemaSpec = {
  name,
  columns: [
    {name: 'customerId', type: 'string', isOptional: true},
    {name: 'name', type: 'string'},
    {name: 'about', type: 'string', isOptional: true},
    {name: 'address', type: 'string', isOptional: true},
    {name: 'age', type: 'number', isOptional: true},
    {name: 'balance', type: 'string', isOptional: true},
    {name: 'company', type: 'string', isOptional: true},
    {name: 'email', type: 'string', isOptional: true},
    {name: 'eyeColor', type: 'string', isOptional: true},
    {name: 'favoriteFruit', type: 'string', isOptional: true},
    {name: 'gender', type: 'string', isOptional: true},
    {name: 'greeting', type: 'string', isOptional: true},
    {name: 'guid', type: 'string', isOptional: true},
    {name: 'index', type: 'number', isOptional: true},
    {name: 'is_active', type: 'boolean', isOptional: true},
    {name: 'latitude', type: 'number', isOptional: true},
    {name: 'longitude', type: 'number', isOptional: true},
    {name: 'phone', type: 'string', isOptional: true},
    {name: 'picture', type: 'string', isOptional: true},
    {name: 'registered', type: 'string', isOptional: true},
  ],
};

export default schema;
