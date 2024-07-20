import {FC, ReactElement} from 'react';
import AppWrapper from '@/components/AppWrapper';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {useNavigate} from 'react-router-dom';
import {ERouter} from '@/shared/Router';
import {observer} from 'mobx-react-lite';
import {SquarePlay} from 'lucide-react';

const Home: FC = observer((): ReactElement => {
  const navigate = useNavigate();

  return (
    <AppWrapper>
      <Card className={'w-full h-full flex flex-col items-center justify-center overflow-hidden shadow-md'}>
        <CardHeader className={'justify-center'}>
          <CardTitle className={'text-center'}>Game rule</CardTitle>
        </CardHeader>

        <CardContent className={'justify-center !pt-0'}>
          <p className={'text-center'}>The goal of the game is to type symbols, as quickly as possible before the time runs out</p>
        </CardContent>

        <CardFooter className={'justify-center'}>
          <Button onClick={() => navigate(ERouter.GAME)} variant={'default'} title={'Go to the game'}>
            <SquarePlay className="mr-4 h-5 w-5" />
            <span>Go to the game</span>
          </Button>
        </CardFooter>
      </Card>
    </AppWrapper>
  );
});

export default Home;
