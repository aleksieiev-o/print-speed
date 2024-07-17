import {RootStore} from '@/store';
import {TextsStoreService} from '@/store/TextsStore/service';

export enum ETextsEndpoints {
  TEXTS_LIST = '[id]/texts',
  TEXT_BY_ID = '[id]/texts/[textId]',
}

export interface IText {
  id: string;
  author: string;
  body: string;
  isCreated: boolean;
  charQuantity: number;
  createdDate: string;
  updatedDate: string;
}

export interface ITextsStore {
  rootStore: RootStore;
  textsStoreService: TextsStoreService;
  builtInTextsList: IText[];
  createdTextsList: IText[];
}
