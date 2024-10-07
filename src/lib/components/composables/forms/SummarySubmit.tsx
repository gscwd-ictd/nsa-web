import { FunctionComponent } from 'react';
import { Button } from '../../ui/Button';
import { useApplicationFormStepStore, useApplicationFormStore } from '@nsa/lib/zustand/useApplicationFormStore';
import { usePageContext } from '../new-service-application/NewServiceApplicationPage';
import { LabelValue } from '../../ui/LabelValue';

export const SummarySubmit: FunctionComponent = () => {
  const currentStep = useApplicationFormStepStore((state) => state.currentStep);
  const setCurrentStep = useApplicationFormStepStore((state) => state.setCurrentStep);
  const lotNo = useApplicationFormStore((state) => state.lotNo);
  const street = useApplicationFormStore((state) => state.street);
  const subdivision = useApplicationFormStore((state) => state.subdivision);
  const barangay = useApplicationFormStore((state) => state.barangay);
  const province = useApplicationFormStore((state) => state.province);
  const city = useApplicationFormStore((state) => state.city);
  const zipCode = useApplicationFormStore((state) => state.zipCode);
  const firstName = useApplicationFormStore((state) => state.firstName);
  const lastName = useApplicationFormStore((state) => state.lastName);
  const middleName = useApplicationFormStore((state) => state.middleName);
  const nameExt = useApplicationFormStore((state) => state.nameExt);
  const birthDate = useApplicationFormStore((state) => state.birthDate);

  const { pageRef } = usePageContext();
  return (
    <>
      <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 sm:gap-4 md:gap-4 lg:gap-6">
        <div className=" ">
          <div className="text-xl col-span-2 font-medium text-gray-800 flex gap-1 items-center mt-5 pb-6">
            Service Application Address
          </div>
          <LabelValue id="lotNo" label="Lot No." value={lotNo} />
          <LabelValue id="street" label="Street" value={street ?? 'N/A'} />
          <LabelValue id="subdivision" label="Subdivision" value={subdivision} />
          <LabelValue id="barangay" label="Barangay" value={barangay} />
          <LabelValue id="province" label="Province" value={province} />
          <LabelValue id="city" label="City" value={city} />
          <LabelValue id="zipCode" label="Zipcode" value={zipCode} />
        </div>
        <div className="">
          <div className="text-xl col-span-2 font-medium text-gray-800 flex gap-1 items-center mt-5 pb-6">
            Applicant Information
          </div>
          <LabelValue id="lastName" label="Last Name" value={lastName} />
          <LabelValue id="firstName" label="First Name" value={firstName} />
          <LabelValue id="middleName" label="Middle Name" value={middleName ?? 'N/A'} />
          <LabelValue id="nameExt" label="Name Ext." value={nameExt ?? 'N/A'} />
          <LabelValue id="birthday" label="Birthday" value={birthDate} />
          {/* <LabelValue id="province" label="Province" value={province} />
          <LabelValue id="city" label="City" value={city} />
          <LabelValue id="zipCode" label="Zipcode" value={zipCode} /> */}
        </div>
      </div>
      <div className="flex gap-4 mt-10">
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
        <Button variant="alternative" type="button" onClick={() => {}}>
          Proceed
        </Button>
      </div>
    </>
  );
};
