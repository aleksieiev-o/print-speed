import {FC, ReactElement, useEffect} from 'react';
import AppWrapper from '@/components/AppWrapper';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import LettersCounter from '@/views/Game/LettersCounter';
import Timer from '@/views/Game/Timer';
import {Separator} from '@/components/ui/separator';
import VictoryCounter from '@/views/Game/VictoryCounter';
import PrintSpeedChanger from '@/views/Game/PrintSpeedChanger';
import {observer} from 'mobx-react-lite';
import ChangeGameStatusButton from '@/views/Game/ChangeGameStatus.button';
import CurrentText from '@/views/Game/CurrentText';
import ChangeTextButton from '@/views/Game/ChangeText.button';
import {useNavigate} from 'react-router-dom';
import {ERouter} from '@/Router';
import {useDesktopDevice} from '@/hooks/useDesktopDevice';
import FinishGameStatusModal from '@/views/Game/FinishGameStatus.modal';

const Game: FC = observer((): ReactElement => {
  const {IsNotDesktop} = useDesktopDevice();
  const navigate = useNavigate();

  useEffect(() => {
    if (IsNotDesktop) {
      navigate(ERouter.HOME, {replace: true});
    }
  }, [IsNotDesktop, navigate]);

  return (
    <AppWrapper>
      <Card className={'w-full h-full flex flex-col overflow-y-hidden'}>
        <CardHeader className={'gap-4 justify-center'}>
          <CardTitle>Write this text</CardTitle>

          <Timer />
        </CardHeader>

        <CardContent
          className={
            'h-full grid grid-cols-1 gap-4 content-start overflow-y-hidden'
          }
        >
          <CurrentText />

          <Separator />

          <div
            className={
              'w-full flex flex-col md:flex-row md:gap-6 gap-4 items-start md:items-center justify-between overflow-hidden'
            }
          >
            <LettersCounter />

            <VictoryCounter />
          </div>
        </CardContent>

        <CardFooter
          className={'grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-end'}
        >
          <PrintSpeedChanger />

          <ChangeTextButton />

          <ChangeGameStatusButton />
        </CardFooter>
      </Card>

      <FinishGameStatusModal />
    </AppWrapper>
  );
});

export default Game;
