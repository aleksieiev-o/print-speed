import {FC, ReactElement, useId, useMemo, useState} from 'react';
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose} from '@/components/ui/dialog';
import {Form} from '@/components/ui/form';
import {Plus} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {useToast} from '@/components/ui/use-toast';
import {useLoading} from '@/shared/hooks/useLoading';
import AppFormInputText from '@/shared/ui/appInput/AppFormInput.text';
import SubmitButton from '@/shared/ui/appButton/Submit.button';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useTextsStore} from '@/store/hooks';
import {observer} from 'mobx-react-lite';

const CreateCustomTextDialog: FC = observer((): ReactElement => {
  const formID = useId();
  const {toast} = useToast();
  const {isLoading, setIsLoading} = useLoading();
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  const textsStore = useTextsStore();

  const categorySchema = useMemo(
    () =>
      z.object({
        textBody: z
          .string({
            required_error: 'Field is required',
            invalid_type_error: 'Value must be a string',
          })
          .trim()
          .min(25, 'Text body length must be at least 25 characters')
          .max(255, 'Text body length must not exceed 255 characters'),
      }),
    [],
  );

  const formModel = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
  });

  const onSuccessCallback = async (): Promise<void> => {
    toast({
      title: 'Success',
      description: 'You have successfully created a custom text.',
    });

    formModel.reset();
  };

  const onErrorCallback = async (): Promise<void> => {
    toast({
      title: 'Failure',
      description: 'An error has occurred. Something went wrong.',
      variant: 'destructive',
    });
  };

  const onSettledCallback = async (): Promise<void> => {
    setIsLoading(false);
    setDialogIsOpen(false);
  };

  const handleSubmitForm = async (values: z.infer<typeof categorySchema>) => {
    setIsLoading(true);
    try {
      await textsStore.createCustomText(values.textBody);
      await onSuccessCallback();
    } catch (err) {
      await onErrorCallback();
      console.warn(err);
    } finally {
      await onSettledCallback();
    }
  };

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button variant={'default'} title={'Create custom text'} className="w-[200px]">
          <Plus />

          <span className={'ml-2'}>Create custom text</span>
        </Button>
      </DialogTrigger>

      <DialogContent className={'flex flex-col gap-6'}>
        <DialogHeader>
          <DialogTitle>Create custom text</DialogTitle>

          <DialogDescription>Texts cannot be repeated.</DialogDescription>
        </DialogHeader>

        <div className={'flex h-full w-full flex-col items-center justify-center gap-6'}>
          <Form {...formModel}>
            <form onSubmit={formModel.handleSubmit(handleSubmitForm)} id={formID} className={'flex w-full flex-col items-start justify-center gap-4'}>
              <AppFormInputText
                mode={'textarea'}
                type={'text'}
                formModel={formModel}
                name={'textBody'}
                label={'Text body'}
                placeholder={'Custom text...'}
                required={true}
                disabled={isLoading}
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

          <SubmitButton formId={formID} title={'Create'} btnBody={'Create'} isLoading={isLoading} disabled={false} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

export default CreateCustomTextDialog;
