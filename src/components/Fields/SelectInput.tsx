import React, { FC } from "react";
import { useFormContext, Validate, ValidationRule } from 'react-hook-form';


import { SelectFieldProps } from '../../types';
import { getDefaultRequiredText } from '../../utils';

interface ISelectInputProps extends SelectFieldProps {
  className?: string;
  defaultValidation: ValidationRule<RegExp>;
  validateFunc: Validate<string> | Record<string, Validate<string>>
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
      id={name}
      name={name}
      className={className}
      autoComplete={autocomplete}
      style={{
        ...style,
        appearance: 'none'
      }}
      {...register( name, {
        pattern,
        validate,
        ...validation,
        required: required && getDefaultRequiredText( label )
      } )}
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
