// type FormButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'd'

import React, { ButtonHTMLAttributes } from 'react';

export const FormButton = React.forwardRef<HTMLButtonElement, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>>(
  ({ children, ...props }, forwardedRef) => (
    <button
      ref={forwardedRef}
      {...props}
      type="button"
      className={`text-green-500 hover:bg-green-50 w-full uppercase flex justify-center items-center rounded text-base border border-green-500 py-4`}
    >
      {children}
    </button>
  )
);

FormButton.displayName = 'FormButton';
