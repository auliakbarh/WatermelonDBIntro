import {Collection, Model, Q} from '@nozbe/watermelondb';
import Service from './Service';
import {UsersSchemeName, UsersType} from '@/schemes';
import MOCK_DATA from '@/assets/json';

export type Response = {
  error: boolean;
  message?: any;
  data?: any;
};

export type ResponseSetData = Response;
export type ResponseGetSize = number;
export type ResponseLoadAllData = Response;

export default class Users extends Service {
  private readonly tableName: string;
  private readonly collection: Collection<Model>;
  constructor() {
    super();
    this.tableName = UsersSchemeName;
    this.collection = this.get(UsersSchemeName);
  }

  getCollection() {
    return this.collection;
  }

  async setDataUsers(): Promise<ResponseSetData> {
    const data: UsersType[] = MOCK_DATA.MOCK_DATA_USER;
    let result: ResponseSetData = {error: true, message: ''};
    try {
      let models: boolean | void | Model | Promise<void> | Model[] | null = [];
      let findUser: number;
      for (const user of data) {
        findUser = await this.collection
          .query(Q.where('userId', user.id))
          .fetchCount();
        if (findUser === 0) {
          models.push(
            this.collection.prepareCreate((record: any) => {
              record.userId = user.id;
              record.first_name = user.first_name;
              record.last_name = user.last_name;
              record.email = user.email;
              record.gender = user.gender;
              record.address = user.address;
            }),
          );
        }
      }

      await this.action(async () => {
        // @ts-ignore
        await this.batch(models);
      })
        .then(() => {
          result = {error: false};
        })
        .catch(e => {
          result = {error: true, message: e};
        });
      return result;
    } catch (e) {
      return {
        error: true,
        message: e,
      };
    }
  }

  async getSize(): Promise<ResponseGetSize> {
    return await this.collection.query().fetchCount();
  }

  loadAllData(): ResponseLoadAllData {
    let result: ResponseLoadAllData = {error: true, message: ''};
    try {
      this.get(UsersSchemeName)
        .query()
        .fetch()
        .then(
          data => {
            console.log('success', data.length);
            result = {error: false, data};
          },
          e => {
            console.log('error', e);
            result = {error: true, message: e};
          },
        );
      return result;
    } catch (e) {
      return {
        error: true,
        message: e,
      };
    }
  }
}
