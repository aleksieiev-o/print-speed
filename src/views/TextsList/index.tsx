import {FC, ReactElement, useEffect, useState} from 'react';
import {Card, CardContent} from '@/components/ui/card';
import AppWrapper from '@/components/AppWrapper';
import {observer} from 'mobx-react-lite';
import {Input} from '@/components/ui/input';
import TextCard from './Text.card';
import {useTextsStore} from '@/store/hooks';
import {IText} from '@/store/TextsStore/types';
import CreateCustomTextDialog from './CreateCustomText.dialog';
import RemoveAllCustomTextsDialog from './RemoveAllCustomTexts.dialog';
import {Button} from '@/components/ui/button';
import {Trash2} from 'lucide-react';

const TextsList: FC = observer((): ReactElement => {
  const textsListStore = useTextsStore();
  const [textFilter, setTextFilter] = useState<string>('');
  const [filteredTextsList, setFilteredTextsList] = useState<IText[]>(textsListStore.textsList || []);
  const [dialogRemoveAllIsOpen, setDialogRemoveAllIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const result = textsListStore.textsList.filter((text) => text.body.trim().toLowerCase().includes(textFilter.trim().toLowerCase()));
    setFilteredTextsList(result);
  }, [textFilter, textsListStore.textsList]);

  return (
    <AppWrapper>
      <Card className={'w-full h-full flex flex-col overflow-y-hidden'}>
        <CardContent className={'w-full h-full grid grid-cols-1 gap-4 md:gap-6 content-start overflow-hidden'}>
          <div className="flex w-full flex-col items-end justify-between gap-6 sm:flex-row sm:items-center">
            <Input onChange={(e) => setTextFilter(e.target.value)} value={textFilter} placeholder={'Try to search some text...'} className={'h-12 w-full shadow-md'} />

            <CreateCustomTextDialog />

            <Button onClick={() => setDialogRemoveAllIsOpen(true)} variant="destructive" className="shadow-md" title="Remove all custom texts">
              <Trash2 className="mr-4 h-5 w-5" />
              <p>Remove all custom texts</p>
            </Button>
          </div>

          <div className="w-full h-full grid grid-cols-1 gap-4 md:gap-6 content-start overflow-y-auto overflow-x-hidden pb-1">
            {filteredTextsList.map((text) => (
              <TextCard text={text} key={text.id} />
            ))}
          </div>
        </CardContent>
      </Card>

      <RemoveAllCustomTextsDialog setDialogIsOpen={setDialogRemoveAllIsOpen} dialogIsOpen={dialogRemoveAllIsOpen} />
    </AppWrapper>
  );
});

export default TextsList;
