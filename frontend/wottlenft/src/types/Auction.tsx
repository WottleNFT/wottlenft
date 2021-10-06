import {Category} from './Category';

export interface Auction {
  id: number;
  title: string;
  category: Category;
  imgUrl: string;
}
