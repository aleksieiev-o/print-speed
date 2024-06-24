import {FC, ReactElement} from 'react';
import AppWrapper from '@/components/AppWrapper';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {useNavigate} from 'react-router-dom';
import {ERouter} from '@/shared/Router';
import {useDesktopDevice} from '@/shared/hooks/useDesktopDevice';
import {observer} from 'mobx-react-lite';

const Home: FC = observer((): ReactElement => {
  const {IsNotDesktop} = useDesktopDevice();
  const navigate = useNavigate();

  return (
    <AppWrapper>
      <div className={'w-full h-full grid grid-cols-1 justify-items-center content-center'}>
        <Card className={'shadow-md'}>
          <CardHeader className={'justify-center'}>
            <CardTitle className={'text-center'}>Game rule</CardTitle>
          </CardHeader>

          <CardContent className={'justify-center'}>
            <p className={'text-center'}>The goal of the game is to type symbols, as quickly as possible before the time runs out</p>
          </CardContent>

          <CardFooter className={'justify-center'}>
            {IsNotDesktop ? (
              <p className={'text-center font-bold text-red-500'}>You can use this application only on a personal computer</p>
            ) : (
              <Button onClick={() => navigate(ERouter.GAME)} variant={'default'} title={'Go to the game'}>
                Go to the game
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </AppWrapper>
  );
});

export default Home;
