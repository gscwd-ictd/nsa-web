import { MdCheckCircle, MdOutlineRadioButtonUnchecked } from 'react-icons/md';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/Accordion';
import { useApplicationFormStore } from '@nsa/lib/zustand/useApplicationFormStore';
import { FunctionComponent } from 'react';

type AttachedDocumentsProps = {
  defaultOpen?: boolean;
};

export const AttachedDocuments: FunctionComponent<AttachedDocumentsProps> = ({ defaultOpen = true }) => {
  const proofOfOwnershipToUpload = useApplicationFormStore((state) => state.proofOfOwnershipToUpload);
  const proofOfBillingToUpload = useApplicationFormStore((state) => state.proofOfBillingToUpload);
  const barangayCertificateToUpload = useApplicationFormStore((state) => state.barangayCertificateToUpload);
  const validIdToUpload = useApplicationFormStore((state) => state.validIdToUpload);
  const selfieWithValidIdToUpload = useApplicationFormStore((state) => state.selfieWithValidIdToUpload);

  return (
    <Accordion type="single" collapsible defaultValue={defaultOpen ? 'attached-documents' : ''}>
      <AccordionItem
        value="attached-documents"
        className="sm:px-0 md:px-2  data-[state=closed]:lg:py-2 data-[state=closed]:lg:px-5 data-[state=open]:lg:p-5 data-[state=open]:h-full "
      >
        <AccordionTrigger className="data-[state=open]:pb-6">
          <div className="text-2xl col-span-2 font-medium text-gray-700 flex  items-center gap-2">
            {/* <IoDocumentAttach className="h-6 w-6 fill-indigo-600" /> */}
            <span> Attached documents</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-2 gap-2">
            {/* Proof of ownership */}
            <div className="flex gap-1 items-center">
              {proofOfOwnershipToUpload.length > 0 ? (
                <MdCheckCircle className="w-6 h-6 bg-green-500" />
              ) : (
                <MdOutlineRadioButtonUnchecked className="w-6 h-6 bg-white" />
              )}
              <span className="font-sans ">Proof of Lot Ownership</span>
            </div>

            {/* Proof of Billing */}
            <div className="flex gap-1 items-center">
              {proofOfBillingToUpload.length > 0 ? (
                <MdCheckCircle className="w-6 h-6 bg-green-500" />
              ) : (
                <MdOutlineRadioButtonUnchecked className="w-6 h-6 bg-white" />
              )}
              <span className="font-sans ">Proof of Billing</span>
            </div>

            {/* Barangay Certificate */}
            <div className="flex gap-1 items-center">
              {barangayCertificateToUpload.length > 0 ? (
                <MdCheckCircle className="w-6 h-6 fill-green-500" />
              ) : (
                <MdOutlineRadioButtonUnchecked className="w-6 h-6 bg-white" />
              )}
              <span className="font-sans ">Barangay Certificate</span>
            </div>

            {/* Valid id */}
            <div className="flex gap-1 items-center">
              {validIdToUpload.length > 0 ? (
                <MdCheckCircle className="w-6 h-6 fill-green-500" />
              ) : (
                <MdOutlineRadioButtonUnchecked className="w-6 h-6 bg-white" />
              )}
              <span className="font-sans ">Valid ID</span>
            </div>

            {/* Selfie */}
            <div className="flex gap-1 items-center">
              {selfieWithValidIdToUpload.length > 0 ? (
                <MdCheckCircle className="w-6 h-6 fill-green-500" />
              ) : (
                <MdOutlineRadioButtonUnchecked className="w-6 h-6 bg-white" />
              )}
              <span className="font-sans ">Selfie with Valid ID</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
