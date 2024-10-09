import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/Accordion';
import { LabelValue } from '../../ui/LabelValue';
import { useApplicationFormStore } from '@nsa/lib/zustand/useApplicationFormStore';
import { FunctionComponent } from 'react';

type ApplicantInfoProps = {
  defaultOpen?: boolean;
};

export const ApplicantInfo: FunctionComponent<ApplicantInfoProps> = ({ defaultOpen = true }) => {
  const firstName = useApplicationFormStore((state) => state.firstName);
  const lastName = useApplicationFormStore((state) => state.lastName);
  const middleName = useApplicationFormStore((state) => state.middleName);
  const nameExt = useApplicationFormStore((state) => state.nameExt);
  const birthDate = useApplicationFormStore((state) => state.birthDate);
  const emailAddress = useApplicationFormStore((state) => state.emailAddress);
  const mobileNumber = useApplicationFormStore((state) => state.mobileNumber);

  return (
    <Accordion type="single" collapsible defaultValue={defaultOpen ? 'applicant-information' : ''}>
      <AccordionItem
        value="applicant-information"
        className="sm:px-0 md:px-2  data-[state=closed]:lg:py-2 data-[state=closed]:lg:px-5 data-[state=open]:lg:p-5 data-[state=open]:h-full "
      >
        <AccordionTrigger className="data-[state=open]:pb-6">
          <div className="text-2xl col-span-2 font-medium text-gray-700 flex  items-center gap-2">
            {/* <IoWater className="h-6 w-6 fill-blue-400" /> */}
            <span> Applicant Information</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <LabelValue id="lastName" label="Last Name" value={lastName} />
          <LabelValue id="firstName" label="First Name" value={firstName} />
          <LabelValue id="middleName" label="Middle Name" value={middleName ?? 'N/A'} />
          <LabelValue id="nameExt" label="Name Ext." value={nameExt ?? 'N/A'} />
          <LabelValue id="birthday" label="Birthday" value={birthDate} />
          <LabelValue id="contactNo" label="Contact No." value={mobileNumber} />
          <LabelValue id="emailAddress" label="Email Address" value={emailAddress} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
