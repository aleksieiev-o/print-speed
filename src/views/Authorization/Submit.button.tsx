import {FC, ReactElement} from 'react';
import {Loader2} from 'lucide-react';
import {Button} from '@/components/ui/button';

interface Props {
  formId: string;
  isSignInPage: boolean;
  isLoading: boolean;
}

const SubmitButton: FC<Props> = (props): ReactElement => {
  const {formId, isLoading, isSignInPage} = props;

  return (
    <Button type={'submit'} form={formId} disabled={isLoading} title={isSignInPage ? 'Sign in' : 'Sign up'}>
      {isLoading ? (
        <>
          <Loader2 className={'mr-4 h-5 w-5 animate-spin'} />
          <p>Please wait</p>
        </>
      ) : (
        <p>{isSignInPage ? 'Sign in' : 'Sign up'}</p>
      )}
    </Button>
  );
};

export default SubmitButton;
