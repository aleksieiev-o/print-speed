import {FC, ReactElement} from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Asterisk} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {IAuthUserCredentialsShape} from '@/store/AuthorizationStore/types';

export interface IAppFormFieldProps {
  mode: 'input' | 'textarea';
  formModel: unknown;
  type: 'text' | 'email' | 'password';
  name: keyof IAuthUserCredentialsShape;
  label: string;
  placeholder: string;
  required: boolean;
  disabled: boolean;
}

const AppFormField: FC<IAppFormFieldProps> = (props): ReactElement => {
  const {mode, formModel, type, name, label, placeholder, required, disabled} =
    props;

  return (
    <FormField
      control={formModel.control}
      name={name as string}
      render={({field}) => (
        <FormItem>
          <FormLabel aria-required={required} className={'flex'}>
            <span className={'mr-0.5'}>{label}</span>

            <Asterisk className={'w-2.5 h-2.5 stroke-destructive self-start'} />
          </FormLabel>

          <FormControl aria-required={required}>
            {mode === 'input' ? (
              <>
                <Input
                  type={type}
                  placeholder={placeholder}
                  aria-required={required}
                  className={'shadow-md'}
                  disabled={disabled}
                  {...field}
                />
              </>
            ) : (
              <Textarea
                placeholder={placeholder}
                aria-required={required}
                className={'shadow-md'}
                disabled={disabled}
                {...field}
              />
            )}
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AppFormField;
