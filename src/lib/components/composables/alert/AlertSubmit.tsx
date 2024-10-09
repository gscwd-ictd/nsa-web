import { FunctionComponent, PropsWithChildren } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../ui/AlertDialog';
import { navigate } from '@nsa/lib/utils/helper/actions';
import { applicationToSubmit } from '@nsa/lib/utils/helper/application';
import { useApplicationFormStore } from '@nsa/lib/zustand/useApplicationFormStore';
import { uuid } from 'uuidv4';

export const AlertSubmit: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const applicationData = applicationToSubmit(useApplicationFormStore((state) => state));

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full" asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              localStorage.setItem('application', JSON.stringify(applicationData));

              // await from backend, get id

              // redirect
              await navigate(uuid());
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
