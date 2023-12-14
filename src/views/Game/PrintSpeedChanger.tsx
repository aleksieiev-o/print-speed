import React, {FC, ReactElement, useMemo, useState} from 'react';
import {EPrintSpeedLevelsList} from '@/views/Game/types/PrintSpeedLevelsList.enum';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type TPrintSpeedLevelsList = Array<{ lpm: EPrintSpeedLevelsList, title: string }>;

const PrintSpeedChanger: FC = (): ReactElement => {
  const printSpeedLevelsList: TPrintSpeedLevelsList = useMemo(() => ([
    { lpm: EPrintSpeedLevelsList.VERY_SLOW, title: 'Very slow' },
    { lpm: EPrintSpeedLevelsList.SLOW, title: 'Slow' },
    { lpm: EPrintSpeedLevelsList.AVERAGE, title: 'Average' },
    { lpm: EPrintSpeedLevelsList.FAST, title: 'Fast' },
    { lpm: EPrintSpeedLevelsList.VERY_FAST, title: 'Very fast' },
    { lpm: EPrintSpeedLevelsList.LIGHTNING, title: 'Lightning' },
  ]), []);

  const defaultLPM: EPrintSpeedLevelsList = useMemo(() => {
    return printSpeedLevelsList.find((item) => item.lpm === EPrintSpeedLevelsList.AVERAGE).lpm;
  }, [printSpeedLevelsList]);

  const [LPM, setLPM] = useState<EPrintSpeedLevelsList>(defaultLPM);

  return (
    <div>
      <p className={'mb-2'}>
        Current print speed: <strong>{LPM}</strong> letters per minute
      </p>

      <Select
        onValueChange={(value) => setLPM(value as EPrintSpeedLevelsList)}
        defaultValue={EPrintSpeedLevelsList.AVERAGE.toString()}>
        <SelectTrigger>
          <SelectValue placeholder={'Print speed'}/>
        </SelectTrigger>

        <SelectContent defaultValue={defaultLPM}>
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
};

export default PrintSpeedChanger;
