import { FunctionComponent, PropsWithChildren } from 'react';
export type HorizontalStepperItemPropsV2 = {
  step: number;
  currentStep: number;
  length: number;
  label: string;
};

export const HorizontalStepperContainerV2: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <ol className="flex items-center  w-full mb-4 sm:mb-5">{children}</ol>;
};

export const HorizontalStepperItem: FunctionComponent<HorizontalStepperItemPropsV2> = ({
  currentStep,
  label,
  length,
  step,
}) => {
  return <></>;
};
