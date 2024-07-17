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

  async fetchBuiltInTextsList(): Promise<IText[]> {
    const data = await fetch('/text_list.json');
    return await data.json();
  }

  async fetchCreatedTextsList(): Promise<IText[]> {
    try {
      const path = this.getCreatedTextsListEndpoint();
      const snapshot: DataSnapshot = await get(child(ref(firebaseDataBase), path));
      const result = snapshot.val() || {};
      return Object.keys(result).map((key) => ({...result[key]})) || [];
    } catch (err) {
      console.warn(err);
      return [] as IText[];
    }
  }

  async fetchCreatedText(id: string): Promise<IText> {
    try {
      const path = this.getCreatedTextByIdEndpoint(id);
      const snapshot: DataSnapshot = await get(child(ref(firebaseDataBase), path));
      return snapshot.val() || {};
    } catch (err) {
      console.warn(err);
      return {} as IText;
    }
  }

  async createCreatedText(payload: string): Promise<IText> {
    try {
      const textRef = push(ref(firebaseDataBase, this.getCreatedTextsListEndpoint()));
      const textKey = textRef.key!;

      const createdText: IText = {
        author: this.rootStore.authorizationStore.userUid,
        body: payload,
        charQuantity: payload.length,
        createdDate: new Date().toISOString(),
        id: textKey,
        isCreated: true,
        updatedDate: new Date().toISOString(),
      };

      await set(textRef, createdText);
      return createdText;
    } catch (err) {
      console.warn(err);
      return Promise.reject({} as IText);
    }
  }

  async updateCreatedText(payload: {currentText: IText; body: string}): Promise<IText> {
    const {currentText, body} = payload;

    try {
      const updates = {};
      updates[this.getCreatedTextByIdEndpoint(currentText.id)] = {
        ...currentText,
        body,
        updatedDate: new Date().toISOString(),
      };

      await update(ref(firebaseDataBase), updates);
      return await this.fetchCreatedText(currentText.id);
    } catch (err) {
      console.warn(err);
      return Promise.reject({} as IText);
    }
  }

  async removeCreatedText(id: string): Promise<string> {
    try {
      await remove(ref(firebaseDataBase, this.getCreatedTextByIdEndpoint(id)));
      return id;
    } catch (err) {
      console.warn(err);
      return id;
    }
  }

  async removeAllCreatedTexts(): Promise<boolean> {
    try {
      await set(ref(firebaseDataBase, this.getCreatedTextsListEndpoint()), null);
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  private getCreatedTextsListEndpoint(): string {
    return `${ETextsEndpoints.TEXTS_LIST}`.replace('[id]', this.rootStore.authorizationStore.userUid);
  }

  private getCreatedTextByIdEndpoint(textId: string): string {
    return `${ETextsEndpoints.TEXT_BY_ID}`.replace('[id]', this.rootStore.authorizationStore.userUid).replace('[textId]', textId);
  }
}
