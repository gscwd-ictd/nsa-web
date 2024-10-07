import React from 'react';

type LabelValueProps = {
  orientation?: 'horizontal' | 'vertical';
  label: string;
  value: string | number | null;
  id: string;
};

export const LabelValue = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & LabelValueProps>(
  ({ id, label, value, orientation = 'horizontal', ...props }, ref) => {
    return (
      <>
        {orientation === 'horizontal' ? (
          <div {...props} className={`${props.className} grid grid-cols-2 gap-2`} ref={ref}>
            <label htmlFor={id} className="text-gray-500">
              {label}
            </label>
            <div className="font-normal text-gray-900">{value}</div>
          </div>
        ) : orientation === 'vertical' ? (
          <div {...props} className={`${props.className} grid grid-rows-2 grid-cols-1 gap-0`} ref={ref}>
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
