import { FunctionComponent } from 'react';
import { Button } from '../../ui/Button';
import { useApplicationFormStepStore, useApplicationFormStore } from '@nsa/lib/zustand/useApplicationFormStore';
import { usePageContext } from '../new-service-application/NewServiceApplicationPage';
import { LabelValue } from '../../ui/LabelValue';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/Accordion';
import { BiSolidLeaf } from 'react-icons/bi';
import { IoDocumentAttach, IoWater } from 'react-icons/io5';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

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
  const emailAddress = useApplicationFormStore((state) => state.emailAddress);
  const mobileNumber = useApplicationFormStore((state) => state.mobileNumber);
  const noOfHouseInLot = useApplicationFormStore((state) => state.noOfHouseInLot);
  const noOfPersonsInHousehold = useApplicationFormStore((state) => state.noOfPersonsInHousehold);
  const proofOfOwnershipToUpload = useApplicationFormStore((state) => state.proofOfOwnershipToUpload);
  const proofOfBillingToUpload = useApplicationFormStore((state) => state.proofOfBillingToUpload);
  const barangayCertificateToUpload = useApplicationFormStore((state) => state.barangayCertificateToUpload);
  const validIdToUpload = useApplicationFormStore((state) => state.validIdToUpload);
  const selfieWithValidIdToUpload = useApplicationFormStore((state) => state.selfieWithValidIdToUpload);

  const { pageRef } = usePageContext();
  return (
    <>
      <div className="text-xl font-medium  sm:text-start lg:text-center">Application Summary</div>
      <div className="text-sm font-normal  sm:text-start lg:text-center pb-5 text-gray-600">
        Confirm application details
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-1 md:grid-rows-1 lg:grid-cols-1 sm:gap-4 md:gap-4 lg:gap-6">
        {/* Service Application Address */}
        <Accordion type="single" collapsible defaultValue="service-application-address">
          <AccordionItem
            value="service-application-address"
            className="sm:px-0 md:px-2  data-[state=closed]:lg:py-2 data-[state=closed]:lg:px-5 data-[state=open]:lg:p-5 data-[state=open]:h-full "
          >
            <AccordionTrigger className="data-[state=open]:pb-6">
              <div className="text-xl col-span-2 font-medium text-gray-700 flex items-center gap-2">
                <BiSolidLeaf className="h-6 w-6 fill-green-600" />
                <span>Service Application Address </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <LabelValue id="lotNo" label="Lot No." value={lotNo} size="lg" />
              <LabelValue id="street" label="Street" value={street ?? 'N/A'} size="lg" />
              <LabelValue id="subdivision" label="Subdivision" value={subdivision} size="lg" />
              <LabelValue id="barangay" label="Barangay" value={barangay} size="lg" />
              <LabelValue id="province" label="Province" value={province} size="lg" />
              <LabelValue id="city" label="City" value={city} size="lg" />
              <LabelValue id="zipCode" label="Zipcode" value={zipCode} size="lg" />
              <LabelValue id="houseInLot" label="No. of houses in lot" value={noOfHouseInLot} size="lg" />
              <LabelValue
                id="personsInHousehold"
                label="No. persons in household"
                value={noOfPersonsInHousehold}
                size="lg"
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Application Information */}
        <Accordion type="single" collapsible defaultValue="applicant-information">
          <AccordionItem
            value="applicant-information"
            className="sm:px-0 md:px-2  data-[state=closed]:lg:py-2 data-[state=closed]:lg:px-5 data-[state=open]:lg:p-5 data-[state=open]:h-full "
          >
            <AccordionTrigger className="data-[state=open]:pb-6">
              <div className="text-xl col-span-2 font-medium text-gray-700 flex  items-center gap-2">
                <IoWater className="h-6 w-6 fill-blue-400" />
                <span> Applicant Information</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <LabelValue id="lastName" label="Last Name" value={lastName} size="lg" />
              <LabelValue id="firstName" label="First Name" value={firstName} size="lg" />
              <LabelValue id="middleName" label="Middle Name" value={middleName ?? 'N/A'} size="lg" />
              <LabelValue id="nameExt" label="Name Ext." value={nameExt ?? 'N/A'} size="lg" />
              <LabelValue id="birthday" label="Birthday" value={birthDate} size="lg" />
              <LabelValue id="contactNo" label="Contact No." value={mobileNumber} size="lg" />
              <LabelValue id="emailAddress" label="Email Address" value={emailAddress} size="lg" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/*  Attached Documents*/}
        <Accordion type="single" collapsible defaultValue="attached-documents">
          <AccordionItem
            value="attached-documents"
            className="sm:px-0 md:px-2  data-[state=closed]:lg:py-2 data-[state=closed]:lg:px-5 data-[state=open]:lg:p-5 data-[state=open]:h-full "
          >
            <AccordionTrigger className="data-[state=open]:pb-6">
              <div className="text-xl col-span-2 font-medium text-gray-700 flex  items-center gap-2">
                <IoDocumentAttach className="h-6 w-6 fill-indigo-600" />
                <span> Attached documents</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-2">
                {/* Proof of ownership */}
                <div className="flex gap-1 items-center">
                  {proofOfOwnershipToUpload.length > 0 ? (
                    <MdCheckBox className="w-6 h-6 bg-green-500" />
                  ) : (
                    <MdCheckBoxOutlineBlank className="w-6 h-6 bg-white" />
                  )}
                  <span className="font-sans text-lg">Proof of Ownership</span>
                </div>

                {/* Proof of Billing */}
                <div className="flex gap-1 items-center">
                  {proofOfBillingToUpload.length > 0 ? (
                    <MdCheckBox className="w-6 h-6 bg-green-500" />
                  ) : (
                    <MdCheckBoxOutlineBlank className="w-6 h-6 bg-white" />
                  )}
                  <span className="font-sans text-lg">Proof of Billing</span>
                </div>

                {/* Barangay Certificate */}
                <div className="flex gap-1 items-center">
                  {barangayCertificateToUpload.length > 0 ? (
                    <MdCheckBox className="w-6 h-6 fill-green-500" />
                  ) : (
                    <MdCheckBoxOutlineBlank className="w-6 h-6 bg-white" />
                  )}
                  <span className="font-sans text-lg">Barangay Certificate</span>
                </div>

                {/* Valid id */}
                <div className="flex gap-1 items-center">
                  {validIdToUpload.length > 0 ? (
                    <MdCheckBox className="w-6 h-6 fill-green-500" />
                  ) : (
                    <MdCheckBoxOutlineBlank className="w-6 h-6 bg-white" />
                  )}
                  <span className="font-sans text-lg">Valid ID</span>
                </div>

                {/* Selfie */}
                <div className="flex gap-1 items-center">
                  {selfieWithValidIdToUpload.length > 0 ? (
                    <MdCheckBox className="w-6 h-6 fill-green-500" />
                  ) : (
                    <MdCheckBoxOutlineBlank className="w-6 h-6 bg-white" />
                  )}
                  <span className="font-sans text-lg">Selfie with Valid ID</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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
          Submit
        </Button>
      </div>
    </>
  );
};
