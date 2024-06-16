import {FC, ReactElement} from 'react';
import {Card, CardContent} from '@/components/ui/card';
import AppWrapper from '@/components/AppWrapper';
import {observer} from 'mobx-react-lite';

const TextsList: FC = observer((): ReactElement => {
  return (
    <AppWrapper>
      <Card className={'w-full h-full flex flex-col overflow-y-hidden'}>
        <CardContent
          className={
            'w-full h-full grid grid-cols-1 gap-4 md:gap-6 content-start overflow-y-auto'
          }
        ></CardContent>
      </Card>
    </AppWrapper>
  );
});

export default TextsList;
