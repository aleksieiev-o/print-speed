import {FC, ReactElement, useEffect} from 'react';
import AppWrapper from '@/components/AppWrapper';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
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
import {ERouter} from '@/shared/Router';
import {useDesktopDevice} from '@/shared/hooks/useDesktopDevice';
import FinishGameStatusDialog from '@/views/Game/FinishGameStatus.dialog';
import {Skeleton} from '@/components/ui/skeleton';
import {useSettingsStore} from '@/store/hooks';

const Game: FC = observer((): ReactElement => {
  const {isNotDesktop} = useDesktopDevice();
  const navigate = useNavigate();
  const settingsStore = useSettingsStore();

  useEffect(() => {
    if (isNotDesktop) {
      navigate(ERouter.HOME, {replace: true});
    }
  }, [isNotDesktop, navigate]);

  return (
    <AppWrapper>
      <Card className={'w-full h-full flex flex-col overflow-y-hidden'}>
        <CardHeader className={'gap-4 justify-center'}>
          <CardTitle>Write this text</CardTitle>

          <Timer />
        </CardHeader>

        <CardContent className={'h-full grid grid-cols-1 gap-4 content-start overflow-y-hidden'}>
          <CurrentText />

          <Separator />

          <div className={'w-full flex flex-col md:flex-row md:gap-6 gap-4 items-start md:items-center justify-between overflow-hidden'}>
            <LettersCounter />

            <VictoryCounter />
          </div>
        </CardContent>

        <CardFooter className={'flex flex-col xl:flex-row flex-nowrap xl:items-end items-start justify-between gap-6'}>
          {settingsStore.gameSettings?.printSpeedLevel ? <PrintSpeedChanger /> : <Skeleton className={'h-12 w-full bg-white/50 min-w-[200px] xl:min-w-[240px]'} />}

          <div className="flex flex-col xl:flex-row flex-nowrap gap-6">
            <ChangeTextButton />

            <ChangeGameStatusButton />
          </div>
        </CardFooter>
      </Card>

      <FinishGameStatusDialog />
    </AppWrapper>
  );
});

export default Game;
