import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';
import {CustomersSchemeName} from '@/schemes';

export default class Customers extends Model {
  static table = CustomersSchemeName;

  @field('customerId')
  customerId!: string;

  @field('name')
  name!: string;

  @field('about')
  about!: string;

  @field('address')
  address!: string;

  @field('age')
  age!: number;

  @field('balance')
  balance!: string;

  @field('company')
  company!: string;

  @field('email')
  email!: string;

  @field('eyeColor')
  eyeColor!: string;

  @field('favoriteFruit')
  favoriteFruit!: string;

  @field('gender')
  gender!: string;

  @field('greeting')
  greeting!: string;

  @field('guid')
  guid!: string;

  @field('index')
  index!: number;

  @field('is_active')
  isActive!: boolean;

  @field('latitude')
  latitude!: number;

  @field('longitude')
  longitude!: number;

  @field('phone')
  phone!: string;

  @field('picture')
  picture!: string;

  @field('registered')
  registered!: string;
}
