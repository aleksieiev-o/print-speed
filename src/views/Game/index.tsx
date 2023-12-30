import {FC, ReactElement, useEffect} from 'react';
import AppWrapper from '@/components/AppWrapper';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import LettersCounter from '@/views/Game/LettersCounter';
import Timer from '@/views/Game/Timer';
import {Separator} from '@/components/ui/separator';
import VictoryCounter from '@/views/Game/VictoryCounter';
import PrintSpeedChanger from '@/views/Game/PrintSpeedChanger';
import {observer} from 'mobx-react-lite';
import {useGameStore} from '@/store/hooks';
import ChangeGameStatusButton from '@/views/Game/ChangeGameStatus.button';
import CurrentText from '@/views/Game/CurrentText';
import ChangeTextButton from '@/views/Game/ChangeText.button';
import {useNavigate} from 'react-router-dom';
import {EnumRouter} from '@/Router';
import {useDesktopDevice} from '@/hooks/useDesktopDevice';
import {EFinishGameStatus} from '@/store/GameStore/types';
import FinishGameStatusModal from '@/views/Game/FinishGameStatus.modal';
import VictoryConfetti from '@/components/VictoryConfetti';

const Game: FC = observer((): ReactElement => {
  const gameStore = useGameStore();
  const {IsNotDesktop} = useDesktopDevice();
  const navigate = useNavigate();

  useEffect(() => {
    if (IsNotDesktop) {
      navigate(EnumRouter.HOME, {replace: true});
    }
  }, [IsNotDesktop, navigate]);

  return (
    <AppWrapper>
      <div className={'w-full h-full grid grid-cols-1 justify-items-center content-center py-4 md:py-8'}>
        <Card className={'w-full flex flex-col gap-4 overflow-y-hidden'}>
          <CardHeader className={'gap-4 justify-center'}>
            <CardTitle>
              Write this text
            </CardTitle>

            <Timer/>
          </CardHeader>

          <CardContent className={'h-full grid grid-cols-1 gap-4 justify-center overflow-y-hidden'}>
            <CurrentText/>

            <Separator/>

            <div className={'w-full flex flex-col md:flex-row gap-4 items-start md:items-center justify-between'}>
              <LettersCounter/>

              {
                gameStore.victoryCounter > 0 && <VictoryCounter victoryQuantity={gameStore.victoryCounter}/>
              }
            </div>
          </CardContent>

          <CardFooter className={'grid grid-cols-1 md:grid-cols-3 gap-4 items-end'}>
            <PrintSpeedChanger/>

            <ChangeTextButton/>

            <ChangeGameStatusButton/>
          </CardFooter>
        </Card>
      </div>

      {
        gameStore.gameFinishStatus === EFinishGameStatus.SUCCESS && <VictoryConfetti/>
      }

      <FinishGameStatusModal/>
    </AppWrapper>
  );
});

export default Game;
