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
      const path = this.getCustomTextsListEndpoint(ETextsEndpoints.TEXTS_LIST);
      const snapshot: DataSnapshot = await get(child(ref(firebaseDataBase), path));
      return snapshot.val() || [];
    } catch (err) {
      console.warn(err);
      return [] as IText[];
    }
  }

  async fetchCustomText(id: string): Promise<IText> {
    try {
      const path = this.getCustomTextByIdEndpoint(ETextsEndpoints.TEXTS_LIST, id);
      const snapshot: DataSnapshot = await get(child(ref(firebaseDataBase), path));
      return snapshot.val() || {};
    } catch (err) {
      console.warn(err);
      return {} as IText;
    }
  }

  async createCustomText(payload: IText): Promise<IText> {
    const {author, body, charQuantity, language} = payload;

    try {
      const textRef = push(ref(firebaseDataBase, this.getCustomTextsListEndpoint(ETextsEndpoints.TEXTS_LIST)));
      const textKey = textRef.key!;

      const customText: IText = {
        author,
        body,
        charQuantity,
        createdDate: new Date().toISOString(),
        id: textKey,
        isCustom: true,
        language,
        updatedDate: new Date().toISOString(),
      };

      await set(textRef, customText);
      return await this.fetchCustomText(textKey);
    } catch (err) {
      console.warn(err);
    }
  }

  async updateCustomText(id: string, payload: IText): Promise<IText> {
    try {
      await update(child(ref(firebaseDataBase), this.getCustomTextByIdEndpoint(ETextsEndpoints.TEXT_BY_ID, id)), {
        ...payload,
        updatedDate: new Date().toISOString(),
      });

      return await this.fetchCustomText(id);
    } catch (err) {
      console.warn(err);
    }
  }

  async removeCustomText(id: string): Promise<string> {
    try {
      await remove(ref(firebaseDataBase, this.getCustomTextByIdEndpoint(ETextsEndpoints.TEXT_BY_ID, id)));
      return id;
    } catch (err) {
      console.warn(err);
      return id;
    }
  }

  async removeAllCustomTexts(): Promise<boolean> {
    try {
      await set(ref(firebaseDataBase, this.getCustomTextsListEndpoint(ETextsEndpoints.TEXTS_LIST)), null);
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  private getCustomTextsListEndpoint(endpoint: ETextsEndpoints): string {
    return `${endpoint}`.replace('[id]', this.rootStore.authorizationStore.userUid);
  }

  private getCustomTextByIdEndpoint(endpoint: ETextsEndpoints, textId: string): string {
    return `${endpoint}`.replace('[id]', this.rootStore.authorizationStore.userUid).replace('[textId]', textId);
  }
}
