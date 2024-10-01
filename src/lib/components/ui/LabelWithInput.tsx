import { cn } from '@nsa/lib/utils/tw-class';
import * as React from 'react';

type LabelWithInputVariant = 'default' | 'primary' | 'secondary' | 'warning' | 'danger' | 'light' | 'simple';

type LabelWithInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  id: string;
  label: string;
  size?: 'small' | 'default' | 'large';
  isError?: boolean;
  errorMessage?: string;
  controller?: object;
  isDirty?: boolean;
  helper?: React.ReactNode | React.ReactNode[];
  isRequired?: boolean;
  variant?: LabelWithInputVariant;
};

const LabelWithInput: React.FunctionComponent<LabelWithInputProps> = ({
  className,
  id,
  type = 'text',
  //   variant = 'primary',
  label,
  size = 'default',
  isError = false,
  errorMessage = '',
  controller,
  //   isDirty = false,
  isRequired = false,
  helper,
  ...props
}) => {
  return (
    <div className="flex flex-col group">
      <label htmlFor={id} className="z-[1] px-2 select-none">
        <div
          className={`-mb-2.5 flex gap-1 text-base tracking-wide font-normal py-0 px-1 bg-white rounded w-fit font-sans  justify-center  text-gray-900 ${
            isError ? 'text-red-600' : 'group-focus-within:text-primary'
          }`}
        >
          {label}
          {isRequired ? (
            <>
              <span className="text-red-700">*</span>
            </>
          ) : (
            <></>
          )}{' '}
          {helper ? <>{helper}</> : null}
        </div>
      </label>
      <input
        {...controller}
        {...props}
        type={type}
        className={cn(
          `flex ${
            size === 'default' ? 'h-10' : size === 'large' ? 'h-12' : size === 'small' ? 'h-8' : ''
          } block border   ${
            isError
              ? 'text-red-600 border-red-400 bg-background focus-visible:outline-none  dark:bg-current focus-visible:ring-1 focus-visible:ring-red-600 ring-offset-background'
              : 'text-gray-700  border-input bg-background bg-blend-darken dark:bg-current  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-background '
          } peer rounded-md px-3 py-2 text-sm  file:border-0  file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-300   disabled:cursor-not-allowed disabled:opacity-75 `,
          className
        )}
      />

      {isError ? <div className="mt-1 px-3 text-xs text-red-500">{errorMessage}</div> : null}
    </div>
  );
};

LabelWithInput.displayName = 'LabelWithInput';

export { LabelWithInput };
