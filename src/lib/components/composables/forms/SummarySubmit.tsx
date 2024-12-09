import { FunctionComponent } from 'react';
import { Button } from '../../ui/Button';
import { useApplicationFormStepStore } from '@nsa/lib/zustand/useApplicationFormStore';
import { usePageContext } from '@nsa/lib/providers/PageProvider';

import { AlertSubmit } from '../alert/AlertSubmit';
import { ServiceAddress } from '../application/ServiceAddress';
import { ApplicantInfo } from '../application/ApplicantInfo';
import { AttachedDocuments } from '../application/AttachedDocuments';
import { DeclaredItems } from '../application/DelcaredItems';
import { HiHandThumbUp } from 'react-icons/hi2';

export const SummarySubmit: FunctionComponent = () => {
  const currentStep = useApplicationFormStepStore((state) => state.currentStep);
  const setCurrentStep = useApplicationFormStepStore((state) => state.setCurrentStep);

  const { pageRef } = usePageContext();
  return (
    <>
      <div className="text-2xl font-medium  sm:text-start lg:text-start sm:px-0 md:px-2 lg:px-5 pt-5 text-gray-600 hidden sm:hidden md:flex lg:flex">
        Application Summary
      </div>
      <div className=" gap-2 items-center text-base font-normal  sm:text-start lg:text-start sm:px-0 md:px-2 lg:px-5 pb-5 text-gray-400 hidden sm:hidden md:flex lg:flex">
        Confirm application details
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-1 md:grid-rows-1 lg:grid-cols-2 sm:gap-4 md:gap-4 lg:gap-6 sm:w-full">
        {/* Service Application Address */}
        <ServiceAddress />

        {/* Applicant Information */}
        <ApplicantInfo />

        {/*  Attached Documents*/}
        <AttachedDocuments />

        {/* Declared Items */}
        <DeclaredItems />
      </div>
      <div className="flex gap-8 mt-10">
        <Button
          variant="outline"
          type="button"
          onClick={() => {
            setCurrentStep(currentStep - 1);
            pageRef.current.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Previous
        </Button>

        <AlertSubmit>
          <Button>Submit Application</Button>
        </AlertSubmit>
      </div>
    </>
  );
};
