import {Badge} from '@/components/ui/badge';
import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card';
import {useAuthorizationStore, useTextsStore} from '@/store/hooks';
import {IText} from '@/store/TextsStore/types';
import {observer} from 'mobx-react-lite';
import {FC, ReactElement, useState} from 'react';
import {Button} from '@/components/ui/button';
import {Trash} from 'lucide-react';
import RemoveConfirmDialog from '@/shared/ui/appDialog/RemoveConfirm.dialog';
import CreateOrUpdateCreatedTextDialog from './CreateOrUpdateCreatedText.dialog';
import TextCardDateFormat from './TextCardDateFormat';

interface Props {
  text: IText;
}

const TextCard: FC<Props> = observer((props): ReactElement => {
  const {text} = props;
  const {id, body, author, isCreated, charQuantity, createdDate, updatedDate} = text;
  const authorizationStore = useAuthorizationStore();
  const textsStore = useTextsStore();
  const [dialogRemoveIsOpen, setDialogRemoveIsOpen] = useState<boolean>(false);

  return (
    <Card className="bg-background shadow-md">
      <CardHeader className="flex md:flex-row flex-col md:items-center items-start gap-4 !pb-0">
        <Badge className="cursor-default">{isCreated ? 'Created' : 'Built-in'}</Badge>
        <p className="text-sm font-bold">{id}</p>
      </CardHeader>

      <CardContent className="flex flex-row flex-nowrap md:gap-6 gap-4 w-full">
        <div className="w-full grid grid-cols-1 gap-4">
          <p>{body}</p>

          <div className="flex items-center justify-start gap-4 grow">
            <span className="font-bold">Author:</span>
            <span className="italic">{!isCreated ? author : authorizationStore.userDN}</span>
          </div>

          <div className="flex items-center justify-start gap-4">
            <span className="font-bold">CharQuantity:</span>
            <span>{charQuantity}</span>
          </div>
        </div>

        {isCreated && (
          <div className="flex flex-col gap-4 items-start justify-start">
            <CreateOrUpdateCreatedTextDialog createdText={text} mode={'update'} />

            <Button onClick={() => setDialogRemoveIsOpen(true)} variant="destructive" className="min-w-[150px] shadow-md" title="Remove created text">
              <Trash className="mr-4 h-5 w-5" />
              <p>Remove</p>
            </Button>
          </div>
        )}
      </CardContent>

      {isCreated && (
        <CardFooter className="w-full grid grid-cols-1 gap-4">
          <TextCardDateFormat title="Created:" date={createdDate} />

          <TextCardDateFormat title="Updated:" date={updatedDate} />
        </CardFooter>
      )}

      {isCreated && (
        <RemoveConfirmDialog
          dialogIsOpen={dialogRemoveIsOpen}
          setDialogIsOpen={setDialogRemoveIsOpen}
          handleAction={async () => await textsStore.removeCreatedText(text.id)}
          dialogTitle={'Remove text confirmation'}
          dialogDescription={'You are about to remove this text.'}
          dialogQuestion={'Are you sure you want to remove this text?'}
          btnTitle={'Remove text'}
          btnBody={'Remove'}
          successCallbackDesc="The text has successfully removed."
        />
      )}
    </Card>
  );
});

export default TextCard;
