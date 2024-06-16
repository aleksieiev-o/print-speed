import * as React from 'react';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '@/lib/utils';

enum EAlertVariant {
  DEFAULT = 'default',
  DESTRUCTIVE = 'destructive',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger',
}

/* tslint:disable */
const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] ' +
    '[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        [EAlertVariant.DEFAULT]: 'bg-background text-foreground',
        [EAlertVariant.DESTRUCTIVE]:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
        [EAlertVariant.INFO]:
          'bg-blue-100 dark:bg-blue-950 text-blue-500 border-blue-300 dark:border-blue-800 [&>svg]:text-blue-500',
        [EAlertVariant.SUCCESS]:
          'bg-green-100 dark:bg-green-950 text-green-500 border-green-300 dark:border-green-800 [&>svg]:text-green-500',
        [EAlertVariant.WARNING]:
          'bg-yellow-100 dark:bg-yellow-950 text-yellow-500 border-yellow-300 dark:border-yellow-800 [&>svg]:text-yellow-500',
        [EAlertVariant.DANGER]:
          'bg-red-100 dark:bg-red-950 text-red-500 border-red-300 dark:border-red-800 [&>svg]:text-red-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({className, variant, ...props}, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({variant}), className)}
    {...props}
  />
));
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({className, ...props}, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({className, ...props}, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

export {Alert, AlertTitle, AlertDescription, EAlertVariant};
