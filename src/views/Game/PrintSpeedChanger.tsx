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
    const speedLevel = printSpeedLevelsList.find(
      (item) => item.lpm === settingsStore.gameSettings.printSpeedLevel,
    );
    return speedLevel?.lpm || EPrintSpeedLevelsList.VERY_SLOW;
  }, [settingsStore.gameSettings.printSpeedLevel, printSpeedLevelsList]);

  const currentSpeedLevelTitle = useMemo((): string => {
    const speedLevel = printSpeedLevelsList.find(
      (item) => item.lpm === settingsStore.gameSettings.printSpeedLevel,
    );
    return speedLevel?.title || '';
  }, [settingsStore.gameSettings.printSpeedLevel, printSpeedLevelsList]);

  const changeLPM = async (lpm: EPrintSpeedLevelsList): Promise<void> => {
    setIsLoading(true);
    await gameStore.changePrintSpeedLevel(lpm);
    setIsLoading(false);
  };

  return (
    <div>
      <p className={'mb-2'}>
        Current print speed:{' '}
        <strong>{settingsStore.gameSettings.printSpeedLevel}</strong> symbols
        per minute ({currentSpeedLevelTitle})
      </p>

      <Select
        onValueChange={(value) => changeLPM(value as EPrintSpeedLevelsList)}
        disabled={isLoading}
        defaultValue={settingsStore.gameSettings.printSpeedLevel}
      >
        <SelectTrigger title={'Change print speed'}>
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
