'use client';
import { useApplicationFormStepStore, useApplicationFormStore } from '@nsa/lib/zustand/useApplicationFormStore';
import { LabelValue } from '../../ui/LabelValue';
import { ServiceAddress } from './ServiceAddress';
import { ApplicantInfo } from './ApplicantInfo';
import { AttachedDocuments } from './AttachedDocuments';
import QRCode from 'react-qr-code';
import { useParams, useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { HorizontalStepperContainer, HorizontalStepperItem } from '../steps/HorizontalStepper';

const stepItems = [
  {
    icon: <span className="text-center">1</span>,
    step: 1,
    tooltip: 'Pay Survey Fee',
  },
  {
    icon: <span className="text-center">2</span>,
    step: 2,
    tooltip: 'Processing',
  },
  {
    icon: <span className="text-center">3</span>,
    step: 3,
    tooltip: 'Installed',
  },
];

export const ApplicationSuccess = () => {
  const applicationId = useParams().applicationId;
  const newApplicationChecker = useSearchParams().get('newApplication');
  const lotNo = useApplicationFormStore((state) => state.lotNo);
  const street = useApplicationFormStore((state) => state.street);
  const subdivision = useApplicationFormStore((state) => state.subdivision);
  const barangay = useApplicationFormStore((state) => state.barangay);
  const firstName = useApplicationFormStore((state) => state.firstName);
  const middleName = useApplicationFormStore((state) => state.middleName);
  const lastName = useApplicationFormStore((state) => state.lastName);
  const nameExt = useApplicationFormStore((state) => state.nameExt);
  const currentStep = useApplicationFormStepStore((state) => state.currentStep);

  // append address
  const address = `${lotNo} ${street}, ${subdivision}, ${barangay}`;

  // append name or full name
  const fullName = `${lastName}, ${firstName} ${middleName ? `${middleName[0]}.` : ','} ${nameExt}`;

  if (!applicationId)
    return <div className="w-[100vw] h-[100vh] justify-center text-center">Invalid application ID</div>;

  return (
    <>
      <div className="flex flex-col justify-center items-center text-center py-10 gap-5">
        {newApplicationChecker === 'true' && newApplicationChecker != undefined && (
          <p className="text-3xl px-10">You have successfully submitted your application!</p>
        )}
        <div className="grid grid-cols-2 gap-4 sm:w-full md:w-full lg:w-1/2 sm:px-2 ">
          <section className="border rounded text-start py-4 px-5">
            <div className="text-gray-500">Application Date</div>
            <div>{dayjs().format('MMM DD, YYYY')}</div>
          </section>

          <section className="border rounded text-start py-4 px-5">
            <div className="text-gray-500">Application ID</div>
            <div>{applicationId.toString()}</div>
          </section>
        </div>

        <div className="w-full sm:px-[1%] lg:px-[25%] pt-5 ">
          <HorizontalStepperContainer>
            {stepItems &&
              stepItems.map((stepItem, idx) => {
                const { icon, step, tooltip } = stepItem;
                return (
                  <HorizontalStepperItem
                    key={idx}
                    icon={icon}
                    step={step}
                    currentStep={currentStep}
                    length={stepItems.length}
                    tooltip={tooltip}
                  />
                );
              })}
          </HorizontalStepperContainer>
        </div>
        {/* QR AND DETAILS */}
        <div className="flex gap-4 justify-center sm:px-2 pt-5">
          <div className="bg-white">
            <QRCode
              size={180}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={applicationId.toString()}
              viewBox={`0 0 180 180`}
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="grid grid-cols-1 text-start">
              <LabelValue label="Status" value="FOR SURVEY FEE PAYMENT" id="status" />
              <LabelValue label="Address" value={address} id="address" />
              <LabelValue label="Applicant" value={fullName} id="fullName" />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:px-2 lg:px-[25%] w-full  py-10">
        <ServiceAddress defaultOpen={false} />
        <ApplicantInfo defaultOpen={false} />
        <AttachedDocuments defaultOpen={false} />
      </div>
    </>
  );
};
