import cx from 'classnames';
import React, { FC, useContext } from "react";

import { useFormContext, Validate, ValidationRule } from 'react-hook-form';
import { CommonFieldProps } from '../../types';
import { GeneratedFormConfigContext } from '../../utils/context';

interface ICheckBoxProps extends CommonFieldProps {
  defaultValidation: ValidationRule<RegExp>;
  validateFunc: Validate<boolean> | Record<string, Validate<boolean>>
}

const CheckBox: FC<ICheckBoxProps> = ( props ) => {
  const { register } = useFormContext()
  const { accent: color } = useContext( GeneratedFormConfigContext )


  const colors = 'text-$color-600 focus:ring-$color-500'.replace( '$color', color );

  return (
    <div className="relative flex items-start">
      <div className="flex items-center h-5">
        <input
          id={props.name}
          aria-describedby={`${props.name}-description`}
          name={props.name}
          type="checkbox"
          className={cx( "h-4 w-4 border-gray-300 rounded", colors )}
          {...register( props.name, {
            pattern: props.defaultValidation,
            validate: props.validateFunc,
            ...props.validation,
            required: props.required && `The field "${props.label}" is required.`,
          } )}
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={props.name} className="font-medium text-gray-700">
          {props.label}
        </label>
        {props.hint && !props.noHint && (
          <p id={`${props.name}-description`} className="text-gray-500">
            {props.hint}
          </p>
        )}
      </div>
    </div>
  );
}

export default CheckBox;
