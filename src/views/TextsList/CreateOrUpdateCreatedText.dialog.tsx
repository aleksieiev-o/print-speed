import {FC, ReactElement, useId, useMemo, useState} from 'react';
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Form} from '@/components/ui/form';
import {Pencil, Plus} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {useToast} from '@/components/ui/use-toast';
import {useLoading} from '@/shared/hooks/useLoading';
import AppFormInputText from '@/shared/ui/appInput/AppFormInput.text';
import SubmitButton from '@/shared/ui/appButton/Submit.button';
import {z, ZodIssueCode} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useTextsStore} from '@/store/hooks';
import {observer} from 'mobx-react-lite';
import {IText} from '@/store/TextsStore/types';

interface Props {
  createdText: IText;
  mode: 'create' | 'update';
}

const CreateOrUpdateCreatedTextDialog: FC<Props> = observer((props: Props): ReactElement => {
  const {createdText, mode} = props;
  const formID = useId();
  const {toast} = useToast();
  const {isLoading, setIsLoading} = useLoading();
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  const textsStore = useTextsStore();

  const textBodyValidation = useMemo(
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

  const categorySchema = useMemo(() => {
    if (mode === 'create') {
      return textBodyValidation;
    }

    return textBodyValidation.superRefine((data, ctx) => {
      if (data.textBody === '') {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          path: ['textBody'],
          message: 'The old and new texts are the same',
        });
      }
    });
  }, [mode, textBodyValidation]);

  const formModel = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      textBody: mode === 'create' ? '' : createdText.body,
    },
  });

  const onSuccessCallback = async (): Promise<void> => {
    toast({
      title: 'Success',
      description: 'You have successfully created a created text.',
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
      if (mode === 'create') {
        await textsStore.createCreatedText(values.textBody);
      } else if (mode === 'update') {
        await textsStore.updateCreatedText({currentText: createdText, body: values.textBody});
      }
      await onSuccessCallback();
    } catch (err) {
      await onErrorCallback();
      console.warn(err);
    } finally {
      await onSettledCallback();
    }
  };

  const dialogContent = useMemo(() => {
    if (mode === 'create') {
      return {
        icon: <Plus className="mr-4 h-5 w-5" />,
        title: 'Create text',
        btnTitle: 'Create',
      };
    }

    return {
      icon: <Pencil className="mr-4 h-5 w-5" />,
      title: 'Edit text',
      btnTitle: 'Edit',
    };
  }, [mode]);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button variant={'default'} title={dialogContent.title} className="min-w-[150px] shadow-md">
          {dialogContent.icon}

          <span className={'ml-2'}>{dialogContent.btnTitle}</span>
        </Button>
      </DialogTrigger>

      <DialogContent className={'flex flex-col gap-6'}>
        <DialogHeader>
          <DialogTitle>{dialogContent.title}</DialogTitle>

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
                placeholder={'Try to write some text...'}
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

          <SubmitButton formId={formID} title={dialogContent.title} btnBody={dialogContent.btnTitle} isLoading={isLoading} disabled={false} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

export default CreateOrUpdateCreatedTextDialog;
