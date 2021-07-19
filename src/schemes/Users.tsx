import {TableSchemaSpec} from '@nozbe/watermelondb/Schema';

export const name = 'users';
export type Users = {
  id: number;
  first_name: string;
  last_name?: string;
  email?: string;
  gender?: string;
  address?: string;
};

const schema: TableSchemaSpec = {
  name,
  columns: [
    {name: 'userId', type: 'number', isOptional: true},
    {name: 'first_name', type: 'string'},
    {name: 'last_name', type: 'string', isOptional: true},
    {name: 'email', type: 'string', isOptional: true},
    {name: 'gender', type: 'string', isOptional: true},
    {name: 'address', type: 'string', isOptional: true},
  ],
};

export default schema;
