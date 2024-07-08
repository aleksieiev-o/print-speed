import {RootStore} from '@/store';
import {IText, ITextsStore} from '@/store/TextsStore/types';
import {TextsStoreService} from '@/store/TextsStore/service';
import {makeAutoObservable, runInAction} from 'mobx';

export class TextsStore implements ITextsStore {
  rootStore: RootStore;
  textsStoreService: TextsStoreService;

  defaultTextsList: IText[];
  customTextsList: IText[];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.textsStoreService = new TextsStoreService(this.rootStore);

    this.defaultTextsList = [];
    this.customTextsList = [];

    this.fetchDefaultTextsList();

    makeAutoObservable(this, {}, {autoBind: true});
  }

  async fetchDefaultTextsList(): Promise<void> {
    const data = await this.textsStoreService.fetchDefaultTextsList();

    runInAction(() => {
      this.defaultTextsList = data;
    });
  }

  async fetchCustomTextsList(): Promise<void> {
    const data = await this.textsStoreService.fetchCustomTextsList();

    runInAction(() => {
      this.customTextsList = data;
    });
  }

  async fetchCustomText(id: string): Promise<IText> {
    return await this.textsStoreService.fetchCustomText(id);
  }

  async createCustomText(payload: string): Promise<void> {
    const customText = await this.textsStoreService.createCustomText(payload);

    runInAction(() => {
      this.customTextsList = [...this.customTextsList, customText];
    });
  }

  async updateCustomText(id: string, payload: IText): Promise<void> {
    const customText = await this.textsStoreService.updateCustomText(id, payload);

    runInAction(() => {
      this.customTextsList = this.customTextsList.map((text) => (text.id === customText.id ? customText : text));
    });
  }

  async removeCustomText(id: string): Promise<void> {
    const customTextId = await this.textsStoreService.removeCustomText(id);

    runInAction(() => {
      this.customTextsList = this.customTextsList.filter((text) => text.id !== customTextId);
    });
  }

  async removeAllCustomTexts(): Promise<void> {
    await this.textsStoreService.removeAllCustomTexts();

    runInAction(() => {
      this.customTextsList = [];
    });
  }

  get textsList(): IText[] {
    return [...this.defaultTextsList, ...this.customTextsList];
  }
}
