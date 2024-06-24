import {FC, ReactElement, useContext, useId, useMemo} from 'react';
import AppWrapper from '@/components/AppWrapper';
import {useLocation} from 'react-router-dom';
import {useChangeRoute} from '@/shared/hooks/useChangeRoute';
import {ERouter} from '@/shared/Router';
import {FirebaseError} from 'firebase/app';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useToast} from '@/components/ui/use-toast';
import {Form} from '@/components/ui/form';
import AppFormField from '@/components/AppFormField';
import AppFormFieldPassword from '@/components/AppFormFieldPassword';
import {Button} from '@/components/ui/button';
import SubmitButton from '@/views/Authorization/Submit.button';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {AppAuthContext} from '@/shared/providers/AppAuth.provider';
import {observer} from 'mobx-react-lite';

const Authorization: FC = observer((): ReactElement => {
  const authFormID = useId();
  const location = useLocation();
  const {toast} = useToast();
  const {changeRoute} = useChangeRoute();
  const {signInWithEmailAndPassword, signInLoading, signUpWithEmailAndPassword, signUpLoading} = useContext(AppAuthContext);

  const isSignInPage = useMemo(() => location.pathname === ERouter.SIGN_IN, [location]);

  const authSchema = useMemo(
    () =>
      z.object({
        email: z
          .string({
            required_error: 'Field is required',
            invalid_type_error: 'Value must be a string',
          })
          .trim()
          .email('Invalid email address')
          .min(3, 'Email length must be at least 3 characters')
          .max(254, 'Email length must not exceed 254 characters'),
        password: z
          .string({
            required_error: 'Field is required',
            invalid_type_error: 'Value must be a string',
          })
          .trim()
          .min(6, 'Password length must be at least 6 characters')
          .max(28, 'Password length must not exceed 28 characters'),
      }),
    [],
  );

  const formModel = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmitForm = async (values: z.infer<typeof authSchema>) => {
    try {
      if (isSignInPage) {
        await signInWithEmailAndPassword(values.email, values.password);
        await changeRoute(ERouter.HOME);
      } else if (!isSignInPage) {
        await signUpWithEmailAndPassword(values.email, values.password);
        await changeRoute(ERouter.HOME);
      }

      formModel.reset();
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case 'auth/invalid-credential': {
            toast({
              // TODO fix toast visible
              title: 'Error message',
              description: '',
              variant: 'destructive',
            });
            break;
          }
          case 'auth/wrong-password': {
            toast({
              title: 'Error message',
              description: '',
              variant: 'destructive',
            });
            break;
          }
          case 'auth/user-not-found': {
            toast({
              title: 'Error message',
              description: '',
              variant: 'destructive',
            });
            break;
          }
          case 'auth/email-already-in-use': {
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
            <CardTitle>{isSignInPage ? 'Sign in' : 'Sign up'}</CardTitle>
          </CardHeader>

          <CardContent>
            <Form {...formModel}>
              <form onSubmit={formModel.handleSubmit(handleSubmitForm)} id={authFormID} className={'w-full flex flex-col items-start justify-center gap-4'}>
                <div className={'w-full flex flex-col items-start justify-center gap-4'}>
                  <AppFormField
                    mode={'input'}
                    type={'email'}
                    formModel={formModel}
                    name={'email'}
                    label={'Email'}
                    placeholder={'john.doe@company.com'}
                    required={true}
                    disabled={signInLoading || signUpLoading}
                  />

                  <AppFormFieldPassword formModel={formModel} disabled={signInLoading || signUpLoading} />
                </div>

                <div className={'flex items-center justify-start'}>
                  <p>{isSignInPage ? `"I·don't·have·an·account."` : 'I already have an account.'}</p>

                  <Button onClick={() => handleToggleAuthRoute()} variant={'link'} disabled={signInLoading || signUpLoading} title={isSignInPage ? 'Sign up' : 'Sign in'}>
                    {isSignInPage ? 'Sign up' : 'Sign in'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>

          <CardFooter className={'w-full flex items-center justify-end gap-4'}>
            <Button onClick={() => changeRoute(ERouter.HOME)} variant={'ghost'} title={'Cancel'}>
              Cancel
            </Button>

            <SubmitButton formId={authFormID} isSignInPage={isSignInPage} isLoading={signInLoading || signUpLoading} />
          </CardFooter>
        </Card>
      </div>
    </AppWrapper>
  );
});

export default Authorization;
