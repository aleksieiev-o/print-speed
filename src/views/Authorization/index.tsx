import {FC, ReactElement, useId, useMemo} from 'react';
import AppWrapper from '@/components/AppWrapper';
import {observer} from 'mobx-react-lite';
import {useAuthorizationStore} from '@/store/hooks';
import {useLocation} from 'react-router-dom';
import {useLoading} from '@/hooks/useLoading';
import {useChangeRoute} from '@/hooks/useChangeRoute';
import {ERouter} from '@/Router';
import { FirebaseError } from 'firebase/app';
import {IAuthUserCredentialsShape} from '@/store/AuthorizationStore/types';
import {useForm} from 'react-hook-form';
import {object, string, z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useToast} from '@/components/ui/use-toast';
import {Form} from '@/components/ui/form';
import AppFormField from '@/components/AppFormField';
import AppFormFieldPassword from '@/components/AppFormFieldPassword';
import {Button} from '@/components/ui/button';
import SubmitButton from '@/views/Authorization/Submit.button';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';

const initialAuthValues = {
  email: '',
  password: '',
};

const Authorization: FC = observer((): ReactElement => {
  const authorizationStore = useAuthorizationStore();
  const authFormID = useId();
  const location = useLocation();
  const { toast } = useToast();
  const {isLoading, setIsLoading} = useLoading();
  const {changeRoute} = useChangeRoute();

  const isSignInPage = useMemo(() => location.pathname === ERouter.SIGN_IN, [location]);

  const shape = useMemo<IAuthUserCredentialsShape>(() => ({
    email: string()
      .trim()
      .email()
      .min(3, 'Error message')
      .max(254, 'Error message'),
    password: string()
      .trim()
      .min(6, 'Error message')
      .max(28, 'Error message'),
  }), []);

  const formSchema = useMemo(() => {
    return object<IAuthUserCredentialsShape>(shape);
  }, [shape]);

  const formModel = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialAuthValues,
  });

  const handleSubmitForm = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      if (isSignInPage) {
        await authorizationStore.signInEmailPassword(values);
        await changeRoute(ERouter.HOME);
      } else if (!isSignInPage) {
        await authorizationStore.singUpEmailAndPassword(values);
        await changeRoute(ERouter.HOME);
      }

      formModel.reset();
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case('auth/invalid-credential'): {
            toast({ // TODO fix toast visible
              title: 'Error message',
              description: '',
              variant: 'destructive',
            });
            break;
          }
          case('auth/wrong-password'): {
            toast({
              title: 'Error message',
              description: '',
              variant: 'destructive',
            });
            break;
          }
          case('auth/user-not-found'): {
            toast({
              title: 'Error message',
              description: '',
              variant: 'destructive',
            });
            break;
          }
          case('auth/email-already-in-use'): {
            toast({
              title: 'Error message',
              description: '',
              variant: 'destructive',
            });
            break;
          }
          default: {
            toast({
              title: 'Error message',
              description: '',
              variant: 'destructive',
            });
          }
        }
        console.warn(err.code);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleAuthRoute = () => {
    changeRoute(isSignInPage ? ERouter.SIGN_UP : ERouter.SIGN_IN);
  };

  return (
    <AppWrapper>
      <div className={'w-full h-full grid grid-cols-1 justify-items-center content-center'}>
        <Card className={'md:w-[550px] w-[350px] shadow-md'}>
          <CardHeader>
            <CardTitle>
              {
                isSignInPage ? 'Sign in' : 'Sign up'
              }
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Form {...formModel}>
              <form
                onSubmit={formModel.handleSubmit(handleSubmitForm)}
                id={authFormID}
                className={'w-full flex flex-col items-start justify-center gap-4'}>
                <div className={'w-full flex flex-col items-start justify-center gap-4'}>
                  <AppFormField
                    mode={'input'}
                    type={'email'}
                    formModel={formModel}
                    name={'email'}
                    label={'Email'}
                    placeholder={'john.doe@company.com'}
                    required={true}
                    disabled={isLoading}/>

                  <AppFormFieldPassword
                    formModel={formModel}
                    disabled={isLoading}/>
                </div>

                <div className={'flex items-center justify-start'}>
                  <p>
                    {
                      isSignInPage ? 'I don\'t have an account.' : 'I already have an account.'
                    }
                  </p>

                  <Button
                    onClick={() => handleToggleAuthRoute()}
                    variant={'link'}
                    disabled={isLoading}
                    title={isSignInPage ? 'Sign up' : 'Sign in'}>
                    {
                      isSignInPage ? 'Sign up' : 'Sign in'
                    }
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>

          <CardFooter className={'w-full flex items-center justify-end gap-4'}>
            <Button
              onClick={() => changeRoute(ERouter.HOME)}
              variant={'ghost'}
              title={'Cancel'}>
              Cancel
            </Button>

            <SubmitButton formId={authFormID} isSignInPage={isSignInPage} isLoading={isLoading}/>
          </CardFooter>
        </Card>
      </div>
    </AppWrapper>
  );
});

export default Authorization;
