/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useApplicationFormStepStore } from '@nsa/lib/zustand/useApplicationFormStore';
import { FaLocationDot } from 'react-icons/fa6';
import { IoDocumentAttach } from 'react-icons/io5';
import { FaAddressCard } from 'react-icons/fa6';
import { HiDocumentCheck } from 'react-icons/hi2';
import { LuCalculator, LuImagePlus } from 'react-icons/lu';
import { useEffect, useRef } from 'react';
import gscwd_logo from '@images/main_logo_transparent2_wBG.png';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { AddressForm } from '../forms/AddressForm';
import { AttachDocumentForm } from '../forms/AttachDocumentForm';
import { SelfieForm } from '../forms/SelfieForm';
import { NewPfdfForm } from '../forms/NewPfdfForm';
import { SummarySubmit } from '../forms/SummarySubmit';
import { HorizontalStepperContainer, HorizontalStepperItem } from '../steps/HorizontalStepper';
import { PageProvider } from '@nsa/lib/providers/PageProvider';
// import { ApplicantDetailsFormV2 } from '../forms/ApplicantDetailsFormV2';
import { ApplicantDetailsForm } from '../forms/ApplicantDetailsForm';

const stepItems = [
  {
    icon: <FaLocationDot className="w-4 h-4 lg:w-6 lg:h-6" />,
    step: 1,
    tooltip: 'Pin Service Application Address',
  },
  {
    icon: <FaAddressCard className="w-4 h-4 lg:w-6 lg:h-6" />,
    step: 2,
    tooltip: 'Fill-out Applicant Information',
  },
  { icon: <IoDocumentAttach className="w-4 h-4 lg:w-6 lg:h-6" />, step: 3, tooltip: 'Attach Necessary Documents' },
  { icon: <LuImagePlus className="w-4 h-4 lg:w-6 lg:h-6" />, step: 4, tooltip: 'Attach Valid ID and Selfie' },
  {
    icon: <LuCalculator className="w-4 h-4 lg:w-6 lg:h-6" />,
    step: 5,
    tooltip: 'Plumbing and Fixtures Declaration Form',
  },
  { icon: <HiDocumentCheck className="w-4 h-4 lg:w-6 lg:h-6" />, step: 6, tooltip: 'Submit Application' },
  // { icon: <IoQrCode className="w-4 h-4 lg:w-6 lg:h-6" />, step: 6, tooltip: 'Save QR Code' },
];

export const NewServiceApplicationPageV2 = () => {
  const currentStep = useApplicationFormStepStore((state) => state.currentStep);
  const pageRef = useRef<any>(null);

  // clears the local storage if the user accesses this page for the first time, or refreshes the page
  useEffect(() => {
    localStorage.clear();
  }, []);

  // const setCurrentStep = useApplicationFormStepStore((state) => state.setCurrentStep);
  // bg-gradient-to-r from-blue-300 from-5% via-blue-100 via-50% to-blue-300  to-95%
  return (
    <PageProvider pageRef={pageRef}>
      <div className="w-full  relative h-[100vh] overflow-y-auto bg-white" ref={pageRef}>
        {/*  */}

        {/* <div className="h-full w-[20%]">.</div> */}
        <div className="w-full  h-fit sm:py-0 lg:py-10 gap-0 flex justify-center ">
          <section className="bg-neutral-50 border border-neutral-200 h-fit shadow-xl rounded-lg w-full sm:mx-[5%] sm:my-[2%] lg:mx-[5%] sm:py-16 sm:px-8 py-8 px-4 lg:p-16">
            <div className="w-full flex justify-start items-center gap-4 mb-8">
              <img
                src={gscwd_logo.src}
                width={120}
                height={120}
                alt="gscwd-logo"
                fetchPriority="low"
                loading="lazy"
                decoding="async"
              />
              <div className="flex flex-col justify-start">
                <p className="text-3xl font-medium text-gray-700 tracking-wider">General Santos City Water District</p>
                <span className="text-xl font-normal  tracking-wider text-gray-600">New Service Application</span>
              </div>
            </div>

            {/* Body */}
            <div className="w-full flex justify-center gap-2 sm:flex md:hidden lg:hidden">
              <div className="sm:block size-24 md:hidden lg:hidden">
                <CircularProgressbar
                  value={currentStep}
                  maxValue={6}
                  minValue={1}
                  text={`${currentStep} of ${stepItems.length}`}
                  counterClockwise
                />
              </div>
              <div className="text-sky-500 flex items-center">{stepItems[currentStep - 1].tooltip}</div>
            </div>
            <div className="sm:hidden md:block lg:block hidden">
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
            {currentStep === 1 && <AddressForm />}
            {currentStep === 2 && <ApplicantDetailsForm />}
            {currentStep === 3 && <AttachDocumentForm />}
            {currentStep === 4 && <SelfieForm />}
            {currentStep === 5 && <NewPfdfForm />}
            {currentStep === 6 && <SummarySubmit />}
          </section>
        </div>
      </div>
    </PageProvider>
  );
};
