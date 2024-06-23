import {FC, ReactElement, useContext, useId, useMemo} from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {useToast} from '@/components/ui/use-toast';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {Form} from '@/components/ui/form';
import {z, ZodIssueCode} from 'zod';
import SubmitButton from '@/shared/ui/appButton/Submit.button';
import {AppAuthContext} from '@/shared/providers/AppAuth.provider';
import {DEFAULT_USER_DN} from '@/shared/appConstants';
import AppFormInputText from '@/shared/ui/appInput/AppFormInput.text';
import {useAuthorizationStore} from '@/store/hooks';
import {observer} from 'mobx-react-lite';

interface Props {
  dialogIsOpen: boolean;
  setDialogIsOpen: (value: boolean) => void;
}

const ChangeDisplayNameDialog: FC<Props> = observer((props): ReactElement => {
  const formID = useId();
  const {dialogIsOpen, setDialogIsOpen} = props;
  const {toast} = useToast();
  const {updateProfile, updateProfileLoading} = useContext(AppAuthContext);
  const authorizationStore = useAuthorizationStore();

  const displayNameSchema = useMemo(
    () =>
      z
        .object({
          displayName: z
            .string({
              required_error: 'Field is required',
              invalid_type_error: 'Value must be a string',
            })
            .trim()
            .min(3, 'Display name length must be at least 3 characters')
            .max(20, 'Display name length must not exceed 20 characters'),
        })
        .superRefine((data, ctx) => {
          if (
            data.displayName === authorizationStore.user?.displayName ||
            data.displayName === DEFAULT_USER_DN
          ) {
            ctx.addIssue({
              code: ZodIssueCode.custom,
              path: ['displayName'],
              message: 'The old and new display names are the same',
            });
          }
        }),
    [authorizationStore.user?.displayName],
  );

  const formModel = useForm<z.infer<typeof displayNameSchema>>({
    resolver: zodResolver(displayNameSchema),
  });

  const handleSubmitForm = async (
    values: z.infer<typeof displayNameSchema>,
  ) => {
    try {
      await updateProfile({displayName: values.displayName});

      toast({
        title: 'Success',
        description: 'Your display name changed successfully.',
      });
    } catch (e) {
      toast({
        title: 'Failure',
        description: 'An error has occurred. Something went wrong.',
        variant: 'destructive',
      });
      console.warn(e);
    } finally {
      formModel.reset();
      setDialogIsOpen(false);
    }
  };

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogContent className={'flex flex-col gap-6'}>
        <DialogHeader>
          <DialogTitle>Change display name</DialogTitle>

          <DialogDescription>
            You are about to change your display name.
          </DialogDescription>
        </DialogHeader>

        <div
          className={
            'flex h-full w-full flex-col items-center justify-center gap-6'
          }
        >
          <div className="flex w-full flex-col items-start justify-start gap-2 overflow-hidden">
            <p>Your current display name is</p>

            <span
              title={authorizationStore.user?.displayName || DEFAULT_USER_DN}
              className="w-full overflow-hidden text-ellipsis whitespace-nowrap font-bold"
            >
              {authorizationStore.user?.displayName || DEFAULT_USER_DN}
            </span>
          </div>

          <Form {...formModel}>
            <form
              onSubmit={formModel.handleSubmit(handleSubmitForm)}
              id={formID}
              className={
                'flex w-full flex-col items-start justify-center gap-4'
              }
            >
              <AppFormInputText
                mode={'input'}
                type={'text'}
                formModel={formModel}
                name={'displayName'}
                label={'Display name'}
                placeholder={'New display name...'}
                required={true}
                disabled={updateProfileLoading}
                isDataPending={false}
              />
            </form>
          </Form>
        </div>

        <DialogFooter className="flex justify-end gap-4">
          <DialogClose asChild>
            <Button variant={'outline'} title={'Close'}>
              Close
            </Button>
          </DialogClose>

          <SubmitButton
            formId={formID}
            title={'Change display name'}
            btnBody={'Update'}
            isLoading={updateProfileLoading}
            disabled={false}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

export default ChangeDisplayNameDialog;
