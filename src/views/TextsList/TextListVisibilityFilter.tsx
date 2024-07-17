import {FC, ReactElement} from 'react';
import {observer} from 'mobx-react-lite';
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from '@/components/ui/select';
import {ETextListVisibility} from './types/TextListVisibility.enum';
import {useTextsStore} from '@/store/hooks';

interface Props {
  textListVisibility: ETextListVisibility;
  setTextListVisibility: (value: ETextListVisibility) => void;
}

const TextListVisibilityFilter: FC<Props> = observer((props): ReactElement => {
  const {textListVisibility, setTextListVisibility} = props;
  const textsStore = useTextsStore();

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

          {textsStore.createdTextsList.length > 0 && <SelectItem value={ETextListVisibility.CREATED}>Created texts</SelectItem>}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});

export default TextListVisibilityFilter;
