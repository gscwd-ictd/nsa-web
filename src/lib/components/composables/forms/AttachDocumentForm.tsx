import { useApplicationFormStepStore, useApplicationFormStore } from '@nsa/lib/zustand/useApplicationFormStore';
import { Button } from '../../ui/Button';
import { DocumentUploadForm } from '../upload/DocumentUploadForm';
import { LucideLightbulb } from 'lucide-react';
import { FunctionComponent } from 'react';
import { usePageContext } from '@nsa/lib/providers/PageProvider';
import { useToast } from '@nsa/hooks/use-toast';

export const AttachDocumentForm: FunctionComponent = () => {
  const setCurrentStep = useApplicationFormStepStore((state) => state.setCurrentStep);
  const currentStep = useApplicationFormStepStore((state) => state.currentStep);
  const proofOfOwnershipToUpload = useApplicationFormStore((state) => state.proofOfOwnershipToUpload);

  const { pageRef } = usePageContext();

  const { toast } = useToast();

  const onSubmit = () => {
    if (proofOfOwnershipToUpload.length < 1) {
      toast({
        title: 'Cannot proceed',
        description: 'Must attach proof of lot ownership',
        variant: 'destructive',
        duration: 1500,
      });
    } else {
      setCurrentStep(currentStep + 1);
      pageRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <form className="w-full">
        <div className="border-2 border-dashed bg-white border-blue-200 rounded-lg p-5">
          <div className="text-xl font-medium mb-2 text-gray-600 gap-1 items-center hidden sm:hidden md:flex lg:flex">
            <span>Attach necessary documents</span>
          </div>
          <div className="flex gap-2">
            <div className="flex justify-center items-start ">
              <LucideLightbulb className="sm:h-10 sm:w-10 lg:h-12 lg:w-12" />
            </div>
            <div>
              <div className="text-amber-500 ">Information</div>
              <div className="">
                We recommend attaching your files in PDF(.pdf)/JPEG(.jpeg)/PNG(.png) format. Take note that these
                documents will only be uploaded when you submit your application. Maximum size per file is 2MB.
              </div>
            </div>
          </div>
        </div>

        <DocumentUploadForm />
        <div className="flex gap-8 mt-10">
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              pageRef.current.scrollTo({ top: 0, behavior: 'smooth' });
              setCurrentStep(currentStep - 1);
            }}
          >
            Previous
          </Button>
          <Button type="button" onClick={onSubmit}>
            Proceed
          </Button>
        </div>
      </form>
    </>
  );
};
