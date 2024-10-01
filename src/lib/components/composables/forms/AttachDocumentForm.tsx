import { useApplicationFormStepStore } from '@nsa/lib/zustand/useApplicationFormStore';
import { Button } from '../../ui/button';
import { DocumentUploadForm } from '../upload/DocumentUploadForm';
import { Alert, AlertDescription, AlertTitle } from '../../ui/alert';
import { LucideLightbulb } from 'lucide-react';
import { FunctionComponent } from 'react';
import { usePageContext } from '../new-service-application/NewServiceApplicationPage';

export const AttachDocumentForm: FunctionComponent = () => {
  const setCurrentStep = useApplicationFormStepStore((state) => state.setCurrentStep);
  const currentStep = useApplicationFormStepStore((state) => state.currentStep);

  const { pageRef } = usePageContext();

  return (
    <>
      <form>
        <div className="text-xl font-medium text-gray-600 mb-2 flex gap-1 items-center mt-10">
          <span>Attach necessary documents</span>
        </div>

        {/* ALERT */}
        <div className=" pb-6">
          <Alert>
            <LucideLightbulb className="h-6 w-6 " />
            <AlertTitle className="text-amber-500 px-10">Information</AlertTitle>
            <AlertDescription className="px-10">
              We recommend attaching your files in PDF(.pdf)/JPEG(.jpeg)/PNG(.png) format. Take note that these
              documents will only be uploaded when you submit your application. Maximum size per file is 2MB.
            </AlertDescription>
          </Alert>
        </div>

        <DocumentUploadForm />
        <div className="flex gap-4 mt-10">
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
          <Button
            variant="alternative"
            type="button"
            onClick={() => {
              pageRef.current.scrollTo({ top: 0, behavior: 'smooth' });
              setCurrentStep(currentStep + 1);
            }}
          >
            Proceed
          </Button>
        </div>
      </form>
    </>
  );
};
