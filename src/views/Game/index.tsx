import React, {FC, ReactElement, useEffect, useState} from 'react';
import AppWrapper from '@/components/AppWrapper';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Play, RefreshCw} from 'lucide-react';
import LettersCounter from '@/views/Game/LettersCounter';
import Timer from '@/views/Game/Timer';
import {Separator} from '@/components/ui/separator';
import VictoryCounter from '@/views/Game/VictoryCounter';

enum EnumPrintSpeedLevel {
  VERY_SLOW = 50,
  SLOW = 150,
  AVERAGE = 250,
  FAST = 350,
  VERY_FAST = 450,
  LIGHTNING = 550,
}

const Game: FC = (): ReactElement => {
  const [text, setText] = useState<string>('');
  const [timer, setTimer] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [victory, setVictory] = useState<number>(1);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const calculatePrintTime = (lpm: EnumPrintSpeedLevel) => (text.length / lpm) * 60;

  const setAnotherText = (): void => {
    setText('The goal of the game is to type letters and symbols, except spaces, as quickly as possible before the time runs out');
  };

  const runGame = (): void => {

  };

  useEffect(() => {
    setAnotherText();
    setTimer(calculatePrintTime(EnumPrintSpeedLevel.AVERAGE));
  }, [calculatePrintTime]); // TODO remove calculatePrintTime from dependencies

  return (
    <AppWrapper>
      <div className={'w-full h-full grid grid-cols-1 justify-items-center content-center py-4 md:py-8'}>
        <Card className={'w-full flex flex-col overflow-y-hidden'}>
          <CardHeader className={'gap-4 justify-center mb-4'}>
            <CardTitle>
              Write this text
            </CardTitle>

            <Timer timer={timer}/>
          </CardHeader>

          <CardContent className={'h-full grid grid-cols-1 gap-4 justify-center mb-4 overflow-y-hidden'}>
            <div className={'overflow-y-auto'}>
              <p className={'text-2xl'}>
                {text}
              </p>
            </div>

            <Separator/>

            <div className={'w-full flex flex-col md:flex-row gap-4 items-start md:items-center justify-between'}>
              <LettersCounter remainingLettersQuantity={10} allLettersQuantity={text.length}/>

              {
                victory > 0 && <VictoryCounter victoryQuantity={victory}/>
              }
            </div>
          </CardContent>

          <CardFooter className={'gap-4 flex-col md:flex-row items-start md:items-center'}>
            <Button onClick={() => setAnotherText()} variant={'default'} title={'Get another text'}>
              <RefreshCw className={'w-4 h-4 mr-2'}/>

              Set another text
            </Button>

            <Button onClick={() => runGame()} variant={'default'} title={'Run the game'}>
              <Play className={'w-4 h-4 mr-2'}/>

              Run the game
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AppWrapper>
  );
};

export default Game;
