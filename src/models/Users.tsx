import {Model} from '@nozbe/watermelondb';
import {field, action} from '@nozbe/watermelondb/decorators';
import {UsersSchemeName, UsersType} from '@/schemes';

export default class Users extends Model {
  static table = UsersSchemeName;

  @field('userId')
  userId!: number;

  @field('first_name')
  firstName!: string;

  @field('last_name')
  lastName!: string;

  @field('email')
  email!: string;

  @field('gender')
  gender!: string;

  @field('address')
  address!: string;
}
