import {FC, ReactElement} from 'react';
import AppWrapper from '@/components/AppWrapper';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {useNavigate} from 'react-router-dom';
import {EnumRouter} from '@/Router';
import {Play} from 'lucide-react';

const Start: FC = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <AppWrapper>
      <div className={'w-full h-full grid grid-cols-1 justify-items-center content-center'}>
        <Card className={'shadow-md'}>
          <CardHeader className={'justify-center'}>
            <CardTitle className={'text-center'}>
              Game rule
            </CardTitle>
          </CardHeader>

          <CardContent className={'justify-center'}>
            <p className={'text-center'}>
              The goal of the game is to type letters and symbols, except spaces, as quickly as possible before the time runs out
            </p>
          </CardContent>

          <CardFooter className={'justify-center'}>
            <Button onClick={() => navigate(EnumRouter.GAME)} variant={'default'} title={'Start the game'}>
              <Play className={'w-4 h-4 mr-2'}/>

              Start the game
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AppWrapper>
  );
};

export default Start;
