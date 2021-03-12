import React, { FC } from "react";
import { RHFInput } from 'react-hook-form-input'
import { useFormContext } from 'react-hook-form';
import { Validate, ValidationOptionObject } from 'react-hook-form-input/dist/types';

import { SelectFieldProps } from '../../types';

interface ISelectInputProps extends SelectFieldProps {
  className?: string;
  defaultValidation: ValidationOptionObject<RegExp>;
  validateFunc: Validate | Record<string, Validate> | {
    value: Validate | Record<string, Validate>;
    message: string;
  };
}

const SelectInput: FC<ISelectInputProps> = ( {
  placeholder,
  required,
  style,
  autocomplete,
  className,
  label,
  name,
  options = [],
  validation,
  validateFunc: validate,
  defaultValidation: pattern,
} ) => {
  const { register } = useFormContext()

  return (
    <RHFInput
      name={name}
      register={register}
      rules={{
        pattern,
        validate,
        ...validation,
        required: required && `The field "${label}" is required.`,
      } as any} as={
        <select
          id={name}
          autoComplete={autocomplete}
          style={{
            ...style,
            appearance: 'none'
          }}
          className={className}
        >
          {placeholder && (
            <option value={placeholder} disabled>
              {placeholder}
            </option>
          )}

          {( options ?? [] ).map( ( { label, value } ) => (
            <option key={value} value={value} title={label}>{label}</option>
          ) )}
        </select>
      } />
  );
}

export default SelectInput;
