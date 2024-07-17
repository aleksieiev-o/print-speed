import {RootStore} from '@/store';
import {IText, ITextsStore} from '@/store/TextsStore/types';
import {TextsStoreService} from '@/store/TextsStore/service';
import {makeAutoObservable, runInAction} from 'mobx';

export class TextsStore implements ITextsStore {
  rootStore: RootStore;
  textsStoreService: TextsStoreService;

  builtInTextsList: IText[];
  createdTextsList: IText[];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.textsStoreService = new TextsStoreService(this.rootStore);

    this.builtInTextsList = [];
    this.createdTextsList = [];

    makeAutoObservable(this, {}, {autoBind: true});
  }

  get textsList(): IText[] {
    return [...this.builtInTextsList, ...this.createdTextsList];
  }

  async fetchBuiltInTextsList(): Promise<void> {
    const data = await this.textsStoreService.fetchBuiltInTextsList();

    runInAction(() => {
      this.builtInTextsList = data;
    });
  }

  async fetchCreatedTextsList(): Promise<void> {
    const data = await this.textsStoreService.fetchCreatedTextsList();

    runInAction(() => {
      this.createdTextsList = data;
    });
  }

  async fetchCreatedText(id: string): Promise<IText> {
    return await this.textsStoreService.fetchCreatedText(id);
  }

  async createCreatedText(payload: string): Promise<void> {
    const createdText = await this.textsStoreService.createCreatedText(payload);

    runInAction(() => {
      this.createdTextsList = [...this.createdTextsList, createdText];
    });
  }

  async updateCreatedText(payload: {currentText: IText; body: string}): Promise<void> {
    const createdText = await this.textsStoreService.updateCreatedText(payload);

    runInAction(() => {
      this.createdTextsList = this.createdTextsList.map((text) => (text.id === createdText.id ? createdText : text));
    });
  }

  async removeCreatedText(id: string): Promise<void> {
    const createdTextId = await this.textsStoreService.removeCreatedText(id);

    runInAction(() => {
      this.createdTextsList = this.createdTextsList.filter((text) => text.id !== createdTextId);
    });
  }

  async removeAllCreatedTexts(): Promise<void> {
    await this.textsStoreService.removeAllCreatedTexts();

    runInAction(() => {
      this.createdTextsList = [];
    });
  }
}
