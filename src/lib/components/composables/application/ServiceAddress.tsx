import { useApplicationFormStore } from '@nsa/lib/zustand/useApplicationFormStore';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/Accordion';
import { LabelValue } from '../../ui/LabelValue';
import { FunctionComponent } from 'react';

type ServiceAddressProps = {
  defaultOpen?: boolean;
};

export const ServiceAddress: FunctionComponent<ServiceAddressProps> = ({ defaultOpen = true }) => {
  const lotNo = useApplicationFormStore((state) => state.lotNo);
  const blockNo = useApplicationFormStore((state) => state.blockNo);
  const street = useApplicationFormStore((state) => state.street);
  const subdivision = useApplicationFormStore((state) => state.subdivision);
  const barangay = useApplicationFormStore((state) => state.barangay);
  const province = useApplicationFormStore((state) => state.province);
  const city = useApplicationFormStore((state) => state.city);
  const zipCode = useApplicationFormStore((state) => state.zipCode);

  const noOfHouseInLot = useApplicationFormStore((state) => state.noOfHouseInLot);
  const noOfPersonsInHousehold = useApplicationFormStore((state) => state.noOfPersonsInHousehold);

  return (
    <Accordion type="single" collapsible defaultValue={defaultOpen === true ? 'service-application-address' : ''}>
      <AccordionItem
        value="service-application-address"
        className="sm:px-0 md:px-2  data-[state=closed]:lg:py-2 data-[state=closed]:lg:px-5 data-[state=open]:lg:p-5 data-[state=open]:h-full "
      >
        <AccordionTrigger className="data-[state=open]:pb-6">
          <div className="text-2xl col-span-2 font-medium text-gray-700 flex items-center gap-2">
            {/* <BiSolidLeaf className="h-6 w-6 fill-green-600" /> */}
            <span>Service Application Address </span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <LabelValue id="lotNo" label="Lot No." value={lotNo} />
          <LabelValue id="blockNo" label="Block No." value={blockNo} />
          <LabelValue id="street" label="Street" value={street ?? 'N/A'} />
          <LabelValue id="subdivision" label="Subdivision" value={subdivision} />
          <LabelValue id="barangay" label="Barangay" value={barangay} />
          <LabelValue id="province" label="Province" value={province} />
          <LabelValue id="city" label="City" value={city} />
          <LabelValue id="zipCode" label="Zipcode" value={zipCode} />
          <LabelValue id="houseInLot" label="No. of houses in lot" value={noOfHouseInLot} />
          <LabelValue id="personsInHousehold" label="No. persons in household" value={noOfPersonsInHousehold} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
