import {RootStore} from '@/store';
import {IText, ITextsStore} from '@/store/TextsStore/types';
import {TextsStoreService} from '@/store/TextsStore/service';
import {makeAutoObservable, runInAction} from 'mobx';

export class TextsStore implements ITextsStore {
  rootStore: RootStore;
  textsStoreService: TextsStoreService;

  textsList: IText[];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.textsStoreService = new TextsStoreService(this.rootStore);

    this.textsList = [];

    this.fetchDefaultTextsList().then(() => {
      this.fetchCustomTextsList().then(() => {
        // TODO change executing the "changeText" in this class
        this.rootStore.gameStore.changeText();
      });
    });

    makeAutoObservable(this, {}, {autoBind: true});
  }

  async fetchDefaultTextsList(): Promise<void> {
    const data = await this.textsStoreService.fetchDefaultTextsList();

    runInAction(() => {
      this.textsList = data;
    });
  }

  async fetchCustomTextsList(): Promise<void> {
    const data = await this.textsStoreService.fetchCustomTextsList();

    runInAction(() => {
      this.textsList = [...this.textsList, ...data];
    });
  }

  async fetchCustomText(id: string): Promise<void> {
    const customText = await this.textsStoreService.fetchCustomText(id);

    runInAction(() => {
      this.textsList = [...this.textsList, ...this.textsList.map((text) => (text.id === customText.id ? customText : text))];
    });
  }

  async createCustomText(payload: IText): Promise<IText> {
    return await this.textsStoreService.createCustomText(payload);
  }

  async updateCustomText(id: string, payload: IText): Promise<IText> {
    return await this.textsStoreService.updateCustomText(id, payload);
  }

  async removeCustomText(id: string): Promise<string> {
    return await this.textsStoreService.removeCustomText(id);
  }

  async removeAllCustomTexts(): Promise<boolean> {
    return await this.textsStoreService.removeAllCustomTexts();
  }
}
