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
import { Button } from '../../ui/Button';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Spinner } from '../../ui/Spinner';
import { useMapStore } from '@nsa/lib/zustand/useMapStore';
import { usePageContext } from '@nsa/lib/providers/PageProvider';
import { WebMap } from '../WebMap';

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
      <div className="border-2 border-dashed bg-white border-blue-200 rounded-lg p-5">
        <div className="text-xl font-medium text-gray-600 mb-2 hidden sm:hidden md:flex lg:flex">
          Pin Service Application Address
        </div>

        <div>
          <div className="flex gap-2">
            <div className="flex justify-center items-start ">
              <LucideLightbulb className="sm:h-10 sm:w-10 lg:h-12 lg:w-12" />
            </div>
            <div>
              <div className="text-amber-500">Information</div>
              <div>
                Click on the map to pin the exact location. You may use the slider on the right or the mouse scroll
                wheel to zoom in and zoom out of the map.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-4">
        <div className="sm:h-[16rem] h-[40rem] lg:h-[40rem] relative w-[100%]">
          <Map />
          {/* <WebMap /> */}
        </div>

        <div className="mt-4 w-full flex justify-center">
          {isInsideLoading ? (
            <div className="w-full flex justify-center">
              <Spinner color="blue" borderSize={4} />
            </div>
          ) : (
            <>
              {isInside == true && coordinates !== undefined ? (
                <span className=" px-2 rounded text-base font-medium p-2 border border-green-400 bg-green-500 text-white">
                  Service location available
                </span>
              ) : isInside == false && coordinates !== undefined ? (
                <span className="  px-2 rounded text-base font-medium p-2 border border-red-400 bg-white text-red-600">
                  Service location unavailable
                </span>
              ) : (
                <span className="px-2 rounded text-base font-medium p-2 border border-gray-300 bg-white text-gray-600">
                  No selected coordinates
                </span>
              )}
            </>
          )}
        </div>

        <div className="text-xl font-medium text-primary mb-2 flex gap-1 items-center mt-10 ">
          <span className="text-primary px-2  rounded">Additional Information</span>
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

      <Button variant={isInside ? 'default' : 'secondary'} disabled={isInside !== true ? true : false}>
        Confirm
      </Button>
    </form>
  );
};
