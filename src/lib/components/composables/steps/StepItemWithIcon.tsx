import { FunctionComponent, PropsWithChildren } from 'react';

export type StepItemProps = {
  label: string;
  description: string;
  step: number;
  icon?: JSX.Element;
  currentStep: number;
  checkIcon?: JSX.Element;
  length: number;
};

export const StepItemWithIcon: FunctionComponent<StepItemProps> = ({
  step,
  checkIcon,

  label,
  icon,
  currentStep,
}) => {
  return (
    <li className={`mb-10 ms-6 flex justify-center items-start gap-6 `}>
      <div> {currentStep >= step ? checkIcon : icon}</div>
      <h3 className="font-semibold text-base leading-tight text-primary">{label}</h3>
    </li>
  );
};

export const StepContainer: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <ol className="relative border-s border-gray-200 dark:border-gray-700 dark:text-gray-400 ">{children}</ol>;
};
