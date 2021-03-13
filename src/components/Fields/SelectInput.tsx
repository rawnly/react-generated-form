import React, { FC } from "react";
import { useFormContext } from 'react-hook-form';
import { Validate, ValidationOptionObject } from 'react-hook-form-input/dist/types';

import { SelectFieldProps } from '../../types';
import { getDefaultRequiredText } from '../../utils';

interface ISelectInputProps extends SelectFieldProps {
  className?: string;
  defaultValidation: ValidationOptionObject<RegExp>;
  validateFunc: Validate | Record<string, Validate>
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
    <select
      ref={register( {
        pattern,
        validate,
        ...validation,
        required: required && getDefaultRequiredText( label )
      } )}
      id={name}
      name={name}
      className={className}
      autoComplete={autocomplete}
      style={{
        ...style,
        appearance: 'none'
      }}
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
  )
}

export default SelectInput;
