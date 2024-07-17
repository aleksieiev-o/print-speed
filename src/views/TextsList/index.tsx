import {FC, ReactElement, useCallback, useEffect, useState} from 'react';
import {Card, CardContent} from '@/components/ui/card';
import AppWrapper from '@/components/AppWrapper';
import {observer} from 'mobx-react-lite';
import {Input} from '@/components/ui/input';
import TextCard from './Text.card';
import {useTextsStore} from '@/store/hooks';
import {IText} from '@/store/TextsStore/types';
import CreateOrUpdateCustomTextDialog from './CreateOrUpdateCustomText.dialog';
import {Button} from '@/components/ui/button';
import {Trash2} from 'lucide-react';
import RemoveConfirmDialog from '@/shared/ui/appDialog/RemoveConfirm.dialog';
import {ETextListVisibility} from './types/TextListVisibility.enum';
import TextListVisibilityFilter from './TextListVisibilityFilter';

const TextsList: FC = observer((): ReactElement => {
  const textsStore = useTextsStore();
  const [textFilter, setTextFilter] = useState<string>('');
  const [filteredTextsList, setFilteredTextsList] = useState<IText[]>(textsStore.textsList || []);
  const [dialogRemoveAllIsOpen, setDialogRemoveAllIsOpen] = useState<boolean>(false);
  const [textListVisibility, setTextListVisibility] = useState<ETextListVisibility>(ETextListVisibility.ALL);

  const filterTextList = useCallback(
    (currentText: IText[]) => {
      return currentText.filter((text) => text.body.trim().toLowerCase().includes(textFilter.trim().toLowerCase()));
    },
    [textFilter],
  );

  useEffect(() => {
    switch (textListVisibility) {
      case ETextListVisibility.ALL:
        setFilteredTextsList(filterTextList(textsStore.textsList));
        break;
      case ETextListVisibility.BUILT_IN:
        setFilteredTextsList(filterTextList(textsStore.defaultTextsList));
        break;
      case ETextListVisibility.CREATED:
        setFilteredTextsList(filterTextList(textsStore.customTextsList));
        break;
      default:
        break;
    }
  }, [filterTextList, textListVisibility, textsStore.customTextsList, textsStore.defaultTextsList, textsStore.textsList]);

  return (
    <AppWrapper>
      <Card className={'w-full h-full flex flex-col overflow-y-hidden'}>
        <CardContent className={'w-full h-full grid grid-cols-1 gap-4 md:gap-6 content-start overflow-hidden'}>
          <div className="flex w-full flex-col items-end justify-between gap-6 sm:flex-row sm:items-center">
            <Input onChange={(e) => setTextFilter(e.target.value)} value={textFilter} placeholder={'Try to search some text...'} className={'h-12 w-full shadow-md'} />

            <CreateOrUpdateCustomTextDialog customText={{} as IText} mode={'create'} />

            {textsStore.customTextsList.length > 0 && (
              <Button onClick={() => setDialogRemoveAllIsOpen(true)} variant="destructive" className="min-w-[150px] shadow-md" title="Remove all custom texts">
                <Trash2 className="mr-4 h-5 w-5" />
                <p>Remove all</p>
              </Button>
            )}
          </div>

          <div className="flex w-full flex-col items-end justify-between gap-6 sm:flex-row sm:items-center">
            <TextListVisibilityFilter textListVisibility={textListVisibility} setTextListVisibility={(value) => setTextListVisibility(value as ETextListVisibility)} />
          </div>

          <div className="w-full h-full grid grid-cols-1 gap-4 md:gap-6 content-start overflow-y-auto overflow-x-hidden pb-1">
            {filteredTextsList.length > 0 ? (
              <>
                {filteredTextsList.map((text) => (
                  <TextCard text={text} key={text.id} />
                ))}
              </>
            ) : (
              <p className="text-center">No results were found at this time</p>
            )}
          </div>
        </CardContent>
      </Card>

      <RemoveConfirmDialog
        dialogIsOpen={dialogRemoveAllIsOpen}
        setDialogIsOpen={setDialogRemoveAllIsOpen}
        handleAction={async () => await textsStore.removeAllCustomTexts()}
        dialogTitle={'Remove all custom texts confirmation'}
        dialogDescription={'You are about to remove all custom texts.'}
        dialogQuestion={'Are you sure you want to remove all custom texts?'}
        btnTitle={'Remove custom texts'}
        btnBody={'Remove'}
        successCallbackDesc="All custom texts have successfully removed."
      />
    </AppWrapper>
  );
});

export default TextsList;
