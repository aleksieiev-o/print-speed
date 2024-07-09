import {Badge} from '@/components/ui/badge';
import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card';
import {useAuthorizationStore} from '@/store/hooks';
import {IText} from '@/store/TextsStore/types';
import {observer} from 'mobx-react-lite';
import {FC, ReactElement, useState} from 'react';
import RemoveCustomTextDialog from './RemoveCustomText.dialog';
import {Button} from '@/components/ui/button';
import {Pencil, Trash} from 'lucide-react';

interface Props {
  text: IText;
}

const TextCard: FC<Props> = observer((props): ReactElement => {
  const {text} = props;
  const {id, body, author, isCustom, charQuantity, createdDate, updatedDate} = text;
  const authorizationStore = useAuthorizationStore();
  const [dialogRemoveIsOpen, setDialogRemoveIsOpen] = useState<boolean>(false);

  return (
    <Card className="bg-background shadow-md">
      <CardHeader className="flex md:flex-row flex-col md:items-center items-start gap-4 !pb-0">
        <Badge className="cursor-default">{isCustom ? 'Custom' : 'Default'}</Badge>
        <p className="font-bold">{id}</p>
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
            <Button onClick={() => undefined} variant="default" className="shadow-md" title="Update custom text">
              <Pencil className="mr-4 h-5 w-5" />
              <p>Update</p>
            </Button>

            <Button onClick={() => setDialogRemoveIsOpen(true)} variant="destructive" className="shadow-md" title="Remove custom text">
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
        <>
          {/* <UpdateCustomTextDialog /> */}

          <RemoveCustomTextDialog setDialogIsOpen={setDialogRemoveIsOpen} dialogIsOpen={dialogRemoveIsOpen} text={text} />
        </>
      )}
    </Card>
  );
});

export default TextCard;
