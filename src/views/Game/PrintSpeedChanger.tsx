import {FC, ReactElement, useMemo} from 'react';
import {EPrintSpeedLevelsList} from '@/store/GameStore/types';
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from '@/components/ui/select';
import {observer} from 'mobx-react-lite';
import {useGameStore, useSettingsStore} from '@/store/hooks';
import {useLoading} from '@/shared/hooks/useLoading';

type TPrintSpeedLevelsList = Array<{lpm: EPrintSpeedLevelsList; title: string}>;

const PrintSpeedChanger: FC = observer((): ReactElement => {
  const gameStore = useGameStore();
  const settingsStore = useSettingsStore();
  const {isLoading, setIsLoading} = useLoading();

  const printSpeedLevelsList: TPrintSpeedLevelsList = useMemo(
    () => [
      {lpm: EPrintSpeedLevelsList.VERY_SLOW, title: 'Very slow'},
      {lpm: EPrintSpeedLevelsList.SLOW, title: 'Slow'},
      {lpm: EPrintSpeedLevelsList.AVERAGE, title: 'Average'},
      {lpm: EPrintSpeedLevelsList.FAST, title: 'Fast'},
      {lpm: EPrintSpeedLevelsList.VERY_FAST, title: 'Very fast'},
      {lpm: EPrintSpeedLevelsList.LIGHTNING, title: 'Lightning'},
    ],
    [],
  );

  const defaultSpeedLevelLPM = useMemo((): EPrintSpeedLevelsList => {
    const speedLevel = printSpeedLevelsList.find((item) => item.lpm === settingsStore.gameSettings.printSpeedLevel);
    return speedLevel?.lpm || settingsStore.gameSettings.printSpeedLevel;
  }, [settingsStore.gameSettings.printSpeedLevel, printSpeedLevelsList]);

  const currentSpeedLevelTitle = useMemo((): string => {
    const speedLevel = printSpeedLevelsList.find((item) => item.lpm === settingsStore.gameSettings.printSpeedLevel);
    return speedLevel?.title || '';
  }, [settingsStore.gameSettings.printSpeedLevel, printSpeedLevelsList]);

  const changeLPM = async (lpm: EPrintSpeedLevelsList): Promise<void> => {
    setIsLoading(true);
    await gameStore.changePrintSpeedLevel(lpm);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <span className={'mb-2'}>
        Current print speed: <strong>{settingsStore.gameSettings.printSpeedLevel}</strong> symbols per minute ({currentSpeedLevelTitle})
      </span>

      <Select
        onValueChange={(value) => changeLPM(value as EPrintSpeedLevelsList)}
        value={settingsStore.gameSettings.printSpeedLevel}
        disabled={isLoading}
        defaultValue={settingsStore.gameSettings.printSpeedLevel}
      >
        <SelectTrigger title={'Change print speed'} className="w-[200px] xl:w-[240px]">
          <SelectValue placeholder={'Print speed'} />
        </SelectTrigger>

        <SelectContent defaultValue={defaultSpeedLevelLPM}>
          <SelectGroup>
            <SelectLabel>Print speed</SelectLabel>

            {printSpeedLevelsList.map((item) => (
              <SelectItem key={item.lpm} value={item.lpm}>
                {item.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
});

export default PrintSpeedChanger;
