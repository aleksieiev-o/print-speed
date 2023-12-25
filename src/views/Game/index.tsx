import {FC, ReactElement} from 'react';
import AppWrapper from '@/components/AppWrapper';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {RefreshCw} from 'lucide-react';
import LettersCounter from '@/views/Game/LettersCounter';
import Timer from '@/views/Game/Timer';
import {Separator} from '@/components/ui/separator';
import VictoryCounter from '@/views/Game/VictoryCounter';
import PrintSpeedChanger from '@/views/Game/PrintSpeedChanger';
import {observer} from 'mobx-react-lite';
import {useGameStore} from '@/store/hooks';
import ChangeGameStatusButton from '@/views/Game/ChangeGameStatus.button';
import {action} from 'mobx';
import CurrentText from '@/views/Game/CurrentText';

const Game: FC = observer((): ReactElement => {
  const gameStore = useGameStore();

  return (
    <AppWrapper>
      <div className={'w-full h-full grid grid-cols-1 justify-items-center content-center py-4 md:py-8'}>
        <Card className={'w-full flex flex-col overflow-y-hidden'}>
          <CardHeader className={'gap-4 justify-center mb-4'}>
            <CardTitle>
              Write this text
            </CardTitle>

            <Timer/>
          </CardHeader>

          <CardContent className={'h-full grid grid-cols-1 gap-4 justify-center mb-4 overflow-y-hidden'}>
            <CurrentText/>

            <Separator/>

            <div className={'w-full flex flex-col md:flex-row gap-4 items-start md:items-center justify-between'}>
              <LettersCounter remainingLettersQuantity={10} allLettersQuantity={gameStore.text.body.length}/>

              {
                gameStore.victoryCounter > 0 && <VictoryCounter victoryQuantity={gameStore.victoryCounter}/>
              }
            </div>
          </CardContent>

          <CardFooter className={'grid grid-cols-1 md:grid-cols-3 gap-4 items-end'}>
            <PrintSpeedChanger/>

            <Button onClick={action('changeText', () => gameStore.changeText())} variant={'default'} title={'Set another text'}>
              <RefreshCw className={'w-4 h-4 mr-2'}/>
              Set another text
            </Button>

            <ChangeGameStatusButton/>
          </CardFooter>
        </Card>
      </div>
    </AppWrapper>
  );
});

export default Game;
