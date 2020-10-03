import {Region} from './Region';

export class Customer {
  id: number;
  firstName: string;
  lastName: string;
  createdAt: string;
  email: string;
  photo?: string
  region?: Region;
}
