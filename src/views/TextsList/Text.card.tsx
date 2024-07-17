import {Badge} from '@/components/ui/badge';
import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card';
import {useAuthorizationStore, useTextsStore} from '@/store/hooks';
import {IText} from '@/store/TextsStore/types';
import {observer} from 'mobx-react-lite';
import {FC, ReactElement, useState} from 'react';
import {Button} from '@/components/ui/button';
import {Trash} from 'lucide-react';
import RemoveConfirmDialog from '@/shared/ui/appDialog/RemoveConfirm.dialog';
import CreateOrUpdateCustomTextDialog from '@/views/TextsList/CreateOrUpdateCustomText.dialog';

interface Props {
  text: IText;
}

const TextCard: FC<Props> = observer((props): ReactElement => {
  const {text} = props;
  const {id, body, author, isCustom, charQuantity, createdDate, updatedDate} = text;
  const authorizationStore = useAuthorizationStore();
  const textsStore = useTextsStore();
  const [dialogRemoveIsOpen, setDialogRemoveIsOpen] = useState<boolean>(false);

  return (
    <Card className="bg-background shadow-md">
      <CardHeader className="flex md:flex-row flex-col md:items-center items-start gap-4 !pb-0">
        <Badge className="cursor-default">{isCustom ? 'Custom' : 'Default'}</Badge>
        <p className="text-sm font-bold">{id}</p>
      </CardHeader>

      <CardContent className="flex flex-row flex-nowrap md:gap-6 gap-4 w-full">
        <div className="w-full grid grid-cols-1 gap-4">
          <p>{body}</p>

          <div className="flex items-center justify-start gap-4 grow">
            <span className="font-bold">Author:</span>
            <span className="italic">{!isCustom ? author : authorizationStore.userDN}</span>
          </div>

          <div className="flex items-center justify-start gap-4">
            <span className="font-bold">CharQuantity:</span>
            <span>{charQuantity}</span>
          </div>
        </div>

        {isCustom && (
          <div className="flex flex-col gap-4 items-start justify-start">
            <CreateOrUpdateCustomTextDialog customText={text} mode={'update'} />

            <Button onClick={() => setDialogRemoveIsOpen(true)} variant="destructive" className="min-w-[150px] shadow-md" title="Remove custom text">
              <Trash className="mr-4 h-5 w-5" />
              <p>Remove</p>
            </Button>
          </div>
        )}
      </CardContent>

      {isCustom && (
        <CardFooter className="w-full grid grid-cols-1 gap-4">
          <div className="flex items-center justify-start gap-4">
            <span className="font-bold text-foreground/30">Created:</span>
            <span className="text-foreground/30">{createdDate}</span>
          </div>

          <div className="flex items-center justify-start gap-4">
            <span className="font-bold text-foreground/30">Updated:</span>
            <span className="text-foreground/30">{updatedDate}</span>
          </div>
        </CardFooter>
      )}

      {isCustom && (
        <RemoveConfirmDialog
          dialogIsOpen={dialogRemoveIsOpen}
          setDialogIsOpen={setDialogRemoveIsOpen}
          handleAction={async () => await textsStore.removeCustomText(text.id)}
          dialogTitle={'Remove custom text confirmation'}
          dialogDescription={'You are about to remove this custom text.'}
          dialogQuestion={'Are you sure you want to remove this custom text?'}
          btnTitle={'Remove custom text'}
          btnBody={'Remove'}
          successCallbackDesc="The custom text has successfully removed."
        />
      )}
    </Card>
  );
});

export default TextCard;
