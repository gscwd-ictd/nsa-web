'use client';
import { FunctionComponent, Suspense } from 'react';
import { isEmpty } from 'lodash';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import QRCode from 'react-qr-code';
import { LabelValue } from '../../ui/LabelValue';
import { useApplicationFormStore } from '@nsa/lib/zustand/useApplicationFormStore';
import { Button } from '../../ui/Button';
import { Spinner } from '../../ui/Spinner';

export const TrackingResults: FunctionComponent = () => {
  // search params
  const currentSearchParams = useSearchParams()?.get('applicationId')?.toString();
  const lotNo = useApplicationFormStore((state) => state.lotNo);
  const street = useApplicationFormStore((state) => state.street);
  const subdivision = useApplicationFormStore((state) => state.subdivision);
  const barangay = useApplicationFormStore((state) => state.barangay);
  const firstName = useApplicationFormStore((state) => state.firstName);
  const middleName = useApplicationFormStore((state) => state.middleName);
  const lastName = useApplicationFormStore((state) => state.lastName);
  const nameExt = useApplicationFormStore((state) => state.nameExt);

  // append address
  const address = `${lotNo} ${street}, ${subdivision}, ${barangay}`;

  // append name or full name
  const fullName = `${lastName}, ${firstName} ${middleName ? `${middleName[0]}.` : ','} ${nameExt}`;

  // use pathname
  const pathname = usePathname();

  // use router
  const router = useRouter();

  return (
    <>
      {!isEmpty(currentSearchParams) && (
        <>
          <div className="flex flex-col justify-center items-center text-center py-10 gap-5">
            <p className="text-3xl px-10">
              Showing results for Application ID{' '}
              <span className="text-gray-700">
                <Suspense
                  fallback={
                    <div className="w-full justify-center">
                      <Spinner />
                    </div>
                  }
                >
                  {currentSearchParams}
                </Suspense>
              </span>
            </p>

            <div className="flex gap-4 justify-center sm:p-5 lg:p-10 rounded-xl bg-slate-100">
              <Suspense
                fallback={
                  <div className="w-full justify-center">
                    <Spinner />
                  </div>
                }
              >
                <div className="bg-white">
                  <QRCode
                    size={180}
                    style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                    value={currentSearchParams!}
                    viewBox={`0 0 180 180`}
                  />
                </div>
              </Suspense>

              <div className="flex flex-col justify-between">
                <div className="grid grid-cols-1 text-start p-2">
                  <LabelValue label="Status" value="FOR SURVEY FEE PAYMENT" id="status" />
                  <LabelValue label="Address" value={address} id="address" />
                  <LabelValue label="Applicant" value={fullName} id="fullName" />
                </div>
                <Button onClick={() => router.push(pathname + '/' + currentSearchParams)}>
                  <span className="text-xl">More Info</span>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
