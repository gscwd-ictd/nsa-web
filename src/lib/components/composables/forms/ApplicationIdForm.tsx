'use client';

import { FunctionComponent, useEffect } from 'react';
import { Input } from '../../ui/Input';
import { z, ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../ui/Button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { isEmpty } from 'lodash';
import { useApplicationFormStore } from '@nsa/lib/zustand/useApplicationFormStore';
import { TrackingResults } from '../application/TrackingResults';

type ApplicationForm = {
  applicationId: string;
};

const TrackApplicationSchema: ZodType<ApplicationForm> = z.object({
  applicationId: z.string().min(5, { message: 'Application ID is required' }),
});

export const ApplicationIdForm: FunctionComponent = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<ApplicationForm>({
    resolver: zodResolver(TrackApplicationSchema),
    reValidateMode: 'onChange',
  });

  const applicationId = useApplicationFormStore((state) => state.applicationId);
  const setApplicationId = useApplicationFormStore((state) => state.setApplicationId);

  // search params
  const currentSearchParams = useSearchParams();

  // use pathname
  const pathname = usePathname();

  // router
  const router = useRouter();

  // submit application id
  const onSubmit = (application: ApplicationForm) => {
    const updatedSearchParams = new URLSearchParams(currentSearchParams.toString());
    updatedSearchParams.set('applicationId', application.applicationId);
    router.push(pathname + '?' + updatedSearchParams.toString());
  };

  // get applicationId searchparams
  const applicationIdFromParams = currentSearchParams.get('applicationId')?.toString();

  useEffect(() => {
    if (!isEmpty(applicationIdFromParams)) {
      setApplicationId(applicationIdFromParams!);
      setValue('applicationId', applicationIdFromParams!);
    } else if (isEmpty(applicationIdFromParams)) {
      setValue('applicationId', '');
      setApplicationId('');
    }
  }, [applicationIdFromParams]);

  return (
    <>
      <div className="py-16 px-[10%] bg-gradient-to-tr from-blue-700 to-blue-500 grid sm:grid-cols-1 lg:grid-cols-2 w-full gap-4 ">
        <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit(onSubmit)}>
          <p className="text-primary-foreground font-sans font-semibold text-4xl">Welcome back!</p>

          <p className="text-primary-foreground text-base">
            To track your application, enter the <span className="font-semibold ">Application ID</span> we sent to you
            through email/sms.
          </p>

          <div className="flex flex-col gap-4">
            <Input
              className="bg-primary-foreground sm:w-full lg:w-1/2 h-[3rem]"
              {...register('applicationId', {
                value: applicationId,
                onChange: (e) => setApplicationId(e.target.value),
              })}
            />

            {errors?.applicationId && <span className="text-xs text-yellow-400">{errors?.applicationId.message}</span>}
            <div className="flex gap-2 sm:w-full lg:w-1/5 ">
              <Button
                variant="secondary"
                type="button"
                onClick={() => {
                  router.replace(pathname);
                  setApplicationId('');
                }}
              >
                <span>Clear</span>
              </Button>
              <Button variant="alternative">Enter</Button>
            </div>
          </div>
        </form>
      </div>

      <TrackingResults />
    </>
  );
};
