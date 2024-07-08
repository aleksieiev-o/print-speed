import {ETextsEndpoints, IText} from '@/store/TextsStore/types';
import {RootStore} from '@/store';
import {child, DataSnapshot, get, push, ref, remove, set, update} from 'firebase/database';
import {firebaseDataBase} from '@/lib/firebase/firebase';

interface ITextsStoreService {
  rootStore: RootStore;
}

export class TextsStoreService implements ITextsStoreService {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  async fetchDefaultTextsList(): Promise<IText[]> {
    const data = await fetch('/text_list.json');
    return await data.json();
  }

  async fetchCustomTextsList(): Promise<IText[]> {
    try {
      const path = this.getCustomTextsListEndpoint();
      const snapshot: DataSnapshot = await get(child(ref(firebaseDataBase), path));
      const result = snapshot.val() || {};
      return Object.keys(result).map((key) => ({...result[key]})) || [];
    } catch (err) {
      console.warn(err);
      return [] as IText[];
    }
  }

  async fetchCustomText(id: string): Promise<IText> {
    try {
      const path = this.getCustomTextByIdEndpoint(id);
      const snapshot: DataSnapshot = await get(child(ref(firebaseDataBase), path));
      return snapshot.val() || {};
    } catch (err) {
      console.warn(err);
      return {} as IText;
    }
  }

  async createCustomText(body: string): Promise<IText> {
    try {
      const textRef = push(ref(firebaseDataBase, this.getCustomTextsListEndpoint()));
      const textKey = textRef.key!;

      const customText: IText = {
        author: this.rootStore.authorizationStore.userUid,
        body,
        charQuantity: body.length,
        createdDate: new Date().toISOString(),
        id: textKey,
        isCustom: true,
        updatedDate: new Date().toISOString(),
      };

      await set(textRef, customText);
      return customText;
    } catch (err) {
      console.warn(err);
      return Promise.reject({} as IText);
    }
  }

  async updateCustomText(id: string, payload: IText): Promise<IText> {
    try {
      const customText = {
        ...payload,
        updatedDate: new Date().toISOString(),
      };

      await update(child(ref(firebaseDataBase), this.getCustomTextByIdEndpoint(id)), customText);
      return customText;
    } catch (err) {
      console.warn(err);
      return Promise.reject({} as IText);
    }
  }

  async removeCustomText(id: string): Promise<string> {
    try {
      await remove(ref(firebaseDataBase, this.getCustomTextByIdEndpoint(id)));
      return id;
    } catch (err) {
      console.warn(err);
      return id;
    }
  }

  async removeAllCustomTexts(): Promise<boolean> {
    try {
      await set(ref(firebaseDataBase, this.getCustomTextsListEndpoint()), null);
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  private getCustomTextsListEndpoint(): string {
    return `${ETextsEndpoints.TEXTS_LIST}`.replace('[id]', this.rootStore.authorizationStore.userUid);
  }

  private getCustomTextByIdEndpoint(textId: string): string {
    return `${ETextsEndpoints.TEXT_BY_ID}`.replace('[id]', this.rootStore.authorizationStore.userUid).replace('[textId]', textId);
  }
}
