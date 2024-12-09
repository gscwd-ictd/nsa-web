import { FunctionComponent, PropsWithChildren } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/Tooltip';

type HorizontalStepperItemProps = {
  icon: JSX.Element;
  step: number;
  currentStep: number;
  length: number;
  tooltip: string;
};

export const HorizontalStepperContainer: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <ol className="flex items-center  w-full mb-4 sm:mb-5">{children}</ol>;
};

export const HorizontalStepperItem: FunctionComponent<HorizontalStepperItemProps> = ({
  icon,
  step,
  currentStep,
  length,
  tooltip = 'Help',
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className={`flex  ${
            currentStep > step && step !== length
              ? "w-full  items-center text-primary-foreground after:border-blue-400 dark:text-blue-500  dark:after:border-blue-800  after:content-[''] after:w-full after:h-1 after:border-b  after:border-4 after:inline-block"
              : currentStep <= step && step !== length
              ? "w-full  items-center after:border-slate-300 dark:after:border-blue-700  after:content-[''] after:w-full after:h-1 after:border-b  after:border-4 after:inline-block "
              : 'w-fit '
          }`}
        >
          <li>
            <div
              className={`flex items-center justify-center w-10 h-10 ${
                currentStep >= step ? 'bg-blue-500 text-primary-foreground' : 'bg-slate-300 text-gray-500'
              } rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0`}
            >
              {icon}
            </div>
          </li>
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
