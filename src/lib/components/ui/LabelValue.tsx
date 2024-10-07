import React from 'react';

type LabelValueProps = {
  orientation?: 'horizontal' | 'vertical';
  label: string;
  value: string | number | null | undefined;
  id: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

export const LabelValue = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & LabelValueProps>(
  ({ id, label, value, orientation = 'horizontal', size = 'md', ...props }, ref) => {
    return (
      <>
        {orientation === 'horizontal' ? (
          <div
            {...props}
            className={`${props.className} ${
              size === 'xs'
                ? 'text-xs'
                : size === 'sm'
                ? 'text-sm'
                : size === 'md'
                ? 'text-base'
                : size === 'lg'
                ? 'text-lg'
                : size === 'xl'
                ? 'text-xl'
                : 'text-base'
            } grid grid-cols-2 gap-2 hover:underline font-sans`}
            ref={ref}
          >
            <label htmlFor={id} className="text-gray-500">
              {label}
            </label>
            <div className="font-normal text-gray-900">{value}</div>
          </div>
        ) : orientation === 'vertical' ? (
          <div
            {...props}
            className={`${props.className} ${
              size === 'xs'
                ? 'text-xs'
                : size === 'sm'
                ? 'text-sm'
                : size === 'md'
                ? 'text-base'
                : size === 'lg'
                ? 'text-lg'
                : size === 'xl'
                ? 'text-xl'
                : 'text-base'
            } grid grid-rows-2 grid-cols-1 gap-0 hover-underline font-sans`}
            ref={ref}
          >
            <label htmlFor={id} className="text-gray-500">
              {label}
            </label>
            <div className="font-normal text-gray-900">{value}</div>
          </div>
        ) : null}
      </>
    );
  }
);

LabelValue.displayName = 'LabelValue';
