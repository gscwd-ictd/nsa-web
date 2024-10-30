import { useApplicationFormStepStore } from '@nsa/lib/zustand/useApplicationFormStore';
import { Button } from '../../ui/Button';
import { usePageContext } from '../new-service-application/NewServiceApplicationPage';

export const PfdfForm = () => {
  const setCurrentStep = useApplicationFormStepStore((state) => state.setCurrentStep);
  const currentStep = useApplicationFormStepStore((state) => state.currentStep);

  const { pageRef } = usePageContext();

  return (
    <>
      PFDF Form Here
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

        <Button
          variant="alternative"
          onClick={() => {
            setCurrentStep(currentStep + 1);
            pageRef.current.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          type="button"
        >
          Next
        </Button>
      </div>
    </>
  );
};
