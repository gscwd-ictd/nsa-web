'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from '@hookform/resolvers/zod';
import { RelatedAddress } from '@nsa/lib/utils/types/address';
import { FunctionComponent, lazy, Suspense, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { useApplicationFormStepStore, useApplicationFormStore } from '@nsa/lib/zustand/useApplicationFormStore';
import { LabelWithInput } from '../../ui/LabelWithInput';
import { Spinner } from '../../ui/Spinner';
import { Alert, AlertDescription, AlertTitle } from '../../ui/alert';
import { LucideLightbulb } from 'lucide-react';
import { usePageContext } from '../new-service-application/NewServiceApplicationPage';
import { Button } from '../../ui/button';
import Webcam from 'react-webcam';

const Map = lazy(() => import('@nsa/lib/components/composables/map/MapComponent'));

const AddressSchema: ZodType<RelatedAddress> = z.object({
  landmark: z.string().min(1, { message: 'Landmarks is required' }),
  neighbors: z.string(),
  remarks: z.string(),
});

export const AddressForm: FunctionComponent = () => {
  const form = useForm<RelatedAddress>({
    resolver: zodResolver(AddressSchema),
    reValidateMode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const currentStep = useApplicationFormStepStore((state) => state.currentStep);

  const landmark = useApplicationFormStore((state) => state.landmark);
  const neighbors = useApplicationFormStore((state) => state.neighbors);
  const remarks = useApplicationFormStore((state) => state.remarks);
  const setCurrentStep = useApplicationFormStepStore((state) => state.setCurrentStep);
  const setLandmark = useApplicationFormStore((state) => state.setLandmark);
  const setNeighbors = useApplicationFormStore((state) => state.setNeighbors);
  const setRemarks = useApplicationFormStore((state) => state.setRemarks);

  const { pageRef } = usePageContext();

  const onSubmit = async (data: RelatedAddress) => {
    console.log(data);
    pageRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(currentStep + 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="addressForm">
      <div className="text-xl font-medium text-gray-600 mt-10">Pin the exact location</div>

      {/* Alert */}
      <div className="pt-2">
        <Alert>
          <LucideLightbulb className="h-6 w-6 " />
          <AlertTitle className="text-amber-500 px-10">Information</AlertTitle>
          <AlertDescription className="px-10">
            Drag the pointer to the exact location. You may use the slider on the left or the mouse scroll wheel to zoom
            in and zoom out of the map. Use the pin finder button on the right-most part to center the map on the
            pointer.
          </AlertDescription>
        </Alert>
      </div>

      <div className="py-4">
        <div className="sm:h-[16rem] lg:h-[22rem] relative">
          <Map />
        </div>

        <div className="text-xl font-medium text-gray-600 mb-2 flex gap-1 items-center mt-10 ">
          <span>Additional Information</span>
        </div>

        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
          <LabelWithInput
            id="landmarks"
            label="Landmark"
            placeholder="ex. Near the plaza"
            size="large"
            autoComplete="off"
            controller={{
              ...register('landmark', {
                value: landmark,
                onChange: (e) => setLandmark(e.target.value),
              }),
            }}
            isError={errors?.landmark ? true : false}
            errorMessage={errors?.landmark?.message}
          />

          <LabelWithInput
            id="neighbors"
            label="Nearest Neighbor/s"
            placeholder="ex. Quintos, Villa, and Dela Cerna"
            size="large"
            autoComplete="off"
            controller={{
              ...register('neighbors', {
                value: neighbors,
                onChange: (e) => setNeighbors(e.target.value),
              }),
            }}
            isError={errors?.neighbors ? true : false}
            errorMessage={errors?.neighbors?.message}
          />

          <LabelWithInput
            id="remarks"
            label="Remarks"
            placeholder="ex. Maroon gate"
            size="large"
            autoComplete="off"
            controller={{
              ...register('remarks', {
                value: remarks,
                onChange: (e) => setRemarks(e.target.value),
              }),
            }}
            isError={errors?.remarks ? true : false}
            errorMessage={errors?.remarks?.message}
          />
        </div>
      </div>

      <Button variant="alternative">Confirm</Button>
    </form>
  );
};
