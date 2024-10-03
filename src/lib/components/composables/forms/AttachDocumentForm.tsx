import { useApplicationFormStepStore } from '@nsa/lib/zustand/useApplicationFormStore';
import { Button } from '../../ui/Button';
import { DocumentUploadForm } from '../upload/DocumentUploadForm';
import { Alert, AlertDescription, AlertTitle } from '../../ui/Alert';
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
            <div className="flex gap-2">
              <div className="flex justify-center items-start ">
                <LucideLightbulb className="sm:h-10 sm:w-10 lg:h-12 lg:w-12" />
              </div>
              <div>
                <AlertTitle className="text-amber-500 ">Information</AlertTitle>
                <AlertDescription className="">
                  We recommend attaching your files in PDF(.pdf)/JPEG(.jpeg)/PNG(.png) format. Take note that these
                  documents will only be uploaded when you submit your application. Maximum size per file is 2MB.
                </AlertDescription>
              </div>
            </div>
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
