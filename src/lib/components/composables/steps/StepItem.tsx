'use client';

import { FunctionComponent } from 'react';

export type StepItemProps = {
  label: string;
  icon?: JSX.Element;
  step: number;
  currentStep: number;
};

export const StepItem: FunctionComponent<StepItemProps> = ({ label, step, currentStep }) => {
  return (
    <div className="relative pl-2 sm:pl-16 py-5 group">
      {/* Vertical line (::before) ~ Date ~ Title ~ Circle marker (::after)  */}
      <div
        className={`flex flex-col items-start sm:flex-row  group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full sm:before:ml-4 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left- sm:after:left-0 after:w-3 after:h-3 ${
          currentStep > step
            ? 'before:bg-primary after:bg-primary after:border-blue-200 before:px-px '
            : 'before:bg-gray-500 after:bg-slate-400 after:border-gray-50 before:px-px'
        } after:border-4 after:box-content after:rounded-full sm:after:ml-4 after:-translate-x-1/2 `}
      >
        <div className="flex flex-col pl-2">
          <div
            className={`font-bold text-lg font-sans -mt-1.5 ${
              currentStep < step
                ? 'text-slate-600'
                : currentStep === step || currentStep >= step
                ? 'text-primary'
                : 'text-gray-800'
            } flex gap-1 items-center`}
          >
            {label}
          </div>
        </div>
      </div>
    </div>
  );
};
