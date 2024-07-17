import {FC, ReactElement} from 'react';
import {observer} from 'mobx-react-lite';
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from '@/components/ui/select';
import {ETextListVisibility} from './types/TextListVisibility.enum';

interface Props {
  textListVisibility: ETextListVisibility;
  setTextListVisibility: (value: ETextListVisibility) => void;
}

const TextListVisibilityFilter: FC<Props> = observer((props): ReactElement => {
  const {textListVisibility, setTextListVisibility} = props;

  return (
    <Select onValueChange={setTextListVisibility} value={textListVisibility} defaultValue={ETextListVisibility.ALL}>
      <SelectTrigger className="w-[180px] shadow-md">
        <SelectValue placeholder="Text list visibility" />
      </SelectTrigger>

      <SelectContent defaultValue={ETextListVisibility.ALL}>
        <SelectGroup>
          <SelectLabel>Text list visibility</SelectLabel>
          <SelectItem value={ETextListVisibility.ALL}>All texts</SelectItem>
          <SelectItem value={ETextListVisibility.BUILT_IN}>Built-in texts</SelectItem>
          <SelectItem value={ETextListVisibility.CREATED}>Created texts</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});

export default TextListVisibilityFilter;
