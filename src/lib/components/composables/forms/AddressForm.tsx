'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from '@hookform/resolvers/zod';
import { RelatedAddress } from '@nsa/lib/utils/types/address';
import { FunctionComponent, lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { useApplicationFormStepStore, useApplicationFormStore } from '@nsa/lib/zustand/useApplicationFormStore';
import { LabelWithInput } from '../../ui/LabelWithInput';

import { Alert, AlertDescription, AlertTitle } from '../../ui/Alert';
import { LucideLightbulb } from 'lucide-react';
import { usePageContext } from '../new-service-application/NewServiceApplicationPage';
import { Button } from '../../ui/Button';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Spinner } from '../../ui/Spinner';
import { useMapStore } from '@nsa/lib/zustand/useMapStore';

// polygon
const polygon = {
  type: 'FeatureCollection',
  name: 'EAST',
  crs: {
    type: 'name',
    properties: {
      name: 'urn:ogc:def:crs:EPSG::32651',
    },
  },
  features: [
    {
      type: 'Feature',
      properties: {
        id: null,
        GID: null,
        BARANGAY: 'EAST',
        POPULATION: 3387,
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [740508.545887596, 676825.682834923],
              [741203.231432956, 676835.337107005],
              [741203.235178303, 676833.663664634],
              [741201.740885076, 676833.646497679],
              [741204.542166176, 676249.694084849],
              [741059.806582108, 676247.551962371],
              [741058.681129625, 676160.329394909],
              [740512.766334409, 676157.656445262],
              [740505.921468564, 676132.37955278],
              [740494.090857263, 676102.808221894],
              [740483.767188183, 676085.758393185],
              [740463.985003333, 676064.542837459],
              [740440.491182742, 676044.284692759],
              [740428.955294788, 676037.391296298],
              [740417.419406833, 676030.497899837],
              [740390.549228793, 676021.353598409],
              [740354.112704644, 676014.460201949],
              [740346.283843708, 676016.04666716],
              [740322.177990428, 676020.931553728],
              [740287.570326564, 676032.326760122],
              [740264.639232216, 676045.410145241],
              [740241.426774746, 676065.527608382],
              [740218.495680397, 676090.709607697],
              [740203.161390311, 676119.830690705],
              [740198.237535697, 676154.438354568],
              [740189.14148286, 676542.258606697],
              [740507.006543738, 676545.178200551],
              [740508.545887596, 676825.682834923],
            ],
          ],
        ],
      },
    },
  ],
};

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
  const coordinates = useApplicationFormStore((state) => state.coordinates);
  const setCurrentStep = useApplicationFormStepStore((state) => state.setCurrentStep);
  const setLandmark = useApplicationFormStore((state) => state.setLandmark);
  const setNeighbors = useApplicationFormStore((state) => state.setNeighbors);
  const setRemarks = useApplicationFormStore((state) => state.setRemarks);
  const isInside = useMapStore((state) => state.isInside);
  const isInsideLoading = useMapStore((state) => state.isInsideLoading);
  const setIsInsideLoading = useMapStore((state) => state.setIsInsideLoading);

  const { pageRef } = usePageContext();

  const onSubmit = async (data: RelatedAddress) => {
    console.log(data);
    pageRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(currentStep + 1);
    localStorage.setItem('relatedAddress', JSON.stringify(data));
  };

  useEffect(() => {
    setTimeout(() => setIsInsideLoading(false), 300);
  }, [isInsideLoading]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="addressForm">
      <div className="text-xl font-medium text-gray-600 mt-10">Pin the exact location</div>

      {/* Alert */}
      <div className="pt-2">
        <Alert>
          <div className="flex gap-2">
            <div className="flex justify-center items-start ">
              <LucideLightbulb className="sm:h-10 sm:w-10 lg:h-12 lg:w-12" />
            </div>
            <div>
              <AlertTitle className="text-amber-500">Information</AlertTitle>
              <AlertDescription>
                Drag the pointer to the exact location. You may use the slider on the left or the mouse scroll wheel to
                zoom in and zoom out of the map. Use the pin finder button on the right-most part to center the pointer
                on the map.
              </AlertDescription>
            </div>
          </div>
        </Alert>
      </div>

      <div className="py-4">
        <div className="sm:h-[16rem] h-[22rem] lg:h-[22rem] relative">
          <Map />
        </div>

        <div className="mt-4 w-full flex justify-center">
          {isInsideLoading ? (
            <div className="w-full flex justify-center">
              <Spinner color="blue" borderSize={4} />
            </div>
          ) : (
            <>
              {isInside == true && coordinates !== undefined ? (
                <span className="bg-emerald-500 text-white px-2 rounded text-sm">Service location available</span>
              ) : isInside == false && coordinates !== undefined ? (
                <span className="bg-rose-500 text-white px-2 rounded text-sm">Service location unavailable</span>
              ) : (
                <span className="text-gray-500 px-2 text-sm">No selected coordinates</span>
              )}
            </>
          )}
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

      <Button variant={isInside ? 'alternative' : 'destructive'} disabled={isInside !== true ? true : false}>
        Confirm
      </Button>
    </form>
  );
};
