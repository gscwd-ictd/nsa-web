/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useApplicationFormStepStore } from '@nsa/lib/zustand/useApplicationFormStore';
import { HorizontalStepperContainer, HorizontalStepperItem } from '../steps/HorizontalStepper';
import { FaLocationDot } from 'react-icons/fa6';
import { IoDocumentAttach } from 'react-icons/io5';
import { FaAddressCard } from 'react-icons/fa6';
// import { TbCameraSelfie } from 'react-icons/tb';
import { HiDocumentCheck } from 'react-icons/hi2';
import { LuImagePlus } from 'react-icons/lu';
import { ApplicantDetailsForm } from '../forms/ApplicantDetailsForm';
import { AddressForm } from '../forms/AddressForm';
import { AttachDocumentForm } from '../forms/AttachDocumentForm';
import { createContext, MutableRefObject, useContext, useEffect, useRef } from 'react';
import gscwd_logo from '@images/main_logo_transparent2_wBG.png';
import { SelfieForm } from '../forms/SelfieForm';
import { SummarySubmit } from '../forms/SummarySubmit';

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
  { icon: <HiDocumentCheck className="w-4 h-4 lg:w-6 lg:h-6" />, step: 5, tooltip: 'Submit Application' },
  // { icon: <IoQrCode className="w-4 h-4 lg:w-6 lg:h-6" />, step: 6, tooltip: 'Save QR Code' },
];

type PageState = {
  pageRef: MutableRefObject<any>;
};

const PageContext = createContext({} as PageState);

export const NewServiceApplicationPage = () => {
  const currentStep = useApplicationFormStepStore((state) => state.currentStep);
  const pageRef = useRef<any>(null);

  // clears the local storage if the user accesses this page for the first time, or refreshes the page
  useEffect(() => {
    localStorage.clear();
  }, []);

  // const setCurrentStep = useApplicationFormStepStore((state) => state.setCurrentStep);

  return (
    <PageContext.Provider value={{ pageRef }}>
      <div className="w-full relative h-[100vh] bg-sky-300 overflow-y-auto" ref={pageRef}>
        <div className=" w-full h-[100vh] absolute ">
          <div className="fixed top-0 left-2 w-[80%] h-[calc(100vw*0.5)]  bg-sky-100 rounded-full blur-3xl filter opacity-70  mix-bl mix-blend-multiply" />
          <div className="fixed top-6 right-4 w-[80%] h-[calc(100vw*0.5)]  bg-blue-600 rounded-full blur-3xl filter opacity-70  mix-blend-multiply" />
          <div className="fixed -bottom-2 -left-4  w-[80%] h-[calc(100vw*0.5)]  bg-green-400 rounded-full blur-3xl filter opacity-70  mix-blend-multiply" />
          <div className="fixed -top-72 -right-4  w-[80%] h-[calc(100vw*0.5)]  bg-emerald-400 rounded-full blur-3xl filter opacity-70  mix-blend-multiply" />
        </div>
        <div className="w-full relative h-fit sm:py-0 lg:py-10 gap-0  flex justify-center">
          <section className="bg-white  h-fit rounded border w-full sm:mx-0 lg:mx-[20%] sm:py-16 sm:px-8 py-8 px-4 lg:p-16 shadow-lg">
            <div className="w-full flex justify-center items-center flex-col pb-8">
              <img
                src={gscwd_logo.src}
                width={120}
                height={120}
                alt="gscwd-logo"
                fetchPriority="low"
                loading="lazy"
                decoding="async"
              />
              <p className="text-2xl font-medium font-sans text-center">General Santos City Water District</p>
              <div className="text-base font-normal font-sans text-center">New Service Application</div>
            </div>
            <div className=" ">
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
            {currentStep === 5 && <SummarySubmit />}
          </section>
        </div>
      </div>
    </PageContext.Provider>
  );
};

export const usePageContext = () => {
  const { pageRef } = useContext(PageContext);

  return { pageRef };
};
