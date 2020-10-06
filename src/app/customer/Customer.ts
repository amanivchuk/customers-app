import {Region} from './Region';
import { Bill } from '../bill/model/Bill';

export class Customer {
  id: number;
  firstName: string;
  lastName: string;
  createdAt: string;
  email: string;
  photo?: string
  region?: Region;
  bills: Array<Bill> = [];

}
