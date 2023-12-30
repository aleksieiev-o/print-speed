import {FC, ReactElement, useMemo} from 'react';
import {EPrintSpeedLevelsList} from '@/store/GameStore/types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {observer} from 'mobx-react-lite';
import {useGameStore} from '@/store/hooks';

type TPrintSpeedLevelsList = Array<{ lpm: EPrintSpeedLevelsList, title: string }>;

const PrintSpeedChanger: FC = observer((): ReactElement => {
  const gameStore = useGameStore();

  const printSpeedLevelsList: TPrintSpeedLevelsList = useMemo(() => ([
    { lpm: EPrintSpeedLevelsList.VERY_SLOW, title: 'Very slow' },
    { lpm: EPrintSpeedLevelsList.SLOW, title: 'Slow' },
    { lpm: EPrintSpeedLevelsList.AVERAGE, title: 'Average' },
    { lpm: EPrintSpeedLevelsList.FAST, title: 'Fast' },
    { lpm: EPrintSpeedLevelsList.VERY_FAST, title: 'Very fast' },
    { lpm: EPrintSpeedLevelsList.LIGHTNING, title: 'Lightning' },
  ]), []);

  const defaultSpeedLevelLPM: EPrintSpeedLevelsList = useMemo(() => {
    const speedLevel = printSpeedLevelsList.find((item) => item.lpm === EPrintSpeedLevelsList.AVERAGE);
    return speedLevel.lpm;
  }, [printSpeedLevelsList]);

  const currentSpeedLevelTitle = useMemo(() => {
    const speedLevel = printSpeedLevelsList.find((item) => item.lpm === gameStore.printSpeedLevel);
    return speedLevel.title;
  }, [gameStore.printSpeedLevel, printSpeedLevelsList]);

  const changeLPM = (lpm: EPrintSpeedLevelsList): void => {
    gameStore.changePrintSpeedLevel(lpm);
  };

  return (
    <div>
      <p className={'mb-2'}>
        Current print speed: <strong>{gameStore.printSpeedLevel}</strong> symbols per minute ({currentSpeedLevelTitle})
      </p>

      <Select
        onValueChange={(value) => changeLPM(value as EPrintSpeedLevelsList)}
        defaultValue={EPrintSpeedLevelsList.AVERAGE}>
        <SelectTrigger>
          <SelectValue placeholder={'Print speed'}/>
        </SelectTrigger>

        <SelectContent defaultValue={defaultSpeedLevelLPM}>
          <SelectGroup>
            <SelectLabel>
              Print speed
            </SelectLabel>

            {
              printSpeedLevelsList.map((item) => (
                <SelectItem key={item.lpm} value={item.lpm}>
                  {item.title}
                </SelectItem>
              ))
            }
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
});

export default PrintSpeedChanger;
