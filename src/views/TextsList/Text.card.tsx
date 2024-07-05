import {Badge} from '@/components/ui/badge';
import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card';
import {IText} from '@/store/TextsStore/types';
import {FC, ReactElement} from 'react';

interface Props {
  text: IText;
}

const TextCard: FC<Props> = (props): ReactElement => {
  const {text} = props;
  const {id, body, author, isCustom, charQuantity, createdDate, updatedDate} = text;

  return (
    <Card className="bg-background shadow-md">
      <CardHeader className="flex md:flex-row flex-col md:items-center items-start gap-4 !pb-0">
        <Badge className="cursor-default">{isCustom ? 'Custom' : 'Default'}</Badge>
        <p className="font-bold">{id}</p>
      </CardHeader>

      <CardContent>
        <div className="w-full grid grid-cols-1 gap-4">
          <p>{body}</p>

          <div className="flex items-center justify-start gap-4">
            <span className="font-bold">Author:</span>
            <span className="italic">{author}</span>
          </div>

          <div className="flex items-center justify-start gap-4">
            <span className="font-bold">CharQuantity:</span>
            <span>{charQuantity}</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-start justify-start">
          {/* <UpdateCustomTextDialog />

						<RemoveCustomTextDialog /> */}
        </div>
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
    </Card>
  );
};

export default TextCard;
