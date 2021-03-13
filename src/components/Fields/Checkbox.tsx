import React, { FC } from "react";

import { useFormContext, Validate, ValidationRule } from 'react-hook-form';
import { CommonFieldProps } from '../../types';
import cx from 'classnames'

interface ICheckBoxProps extends CommonFieldProps {
  defaultValidation: ValidationRule<RegExp>;
  validateFunc: Validate | Record<string, Validate> | {
    value: Validate | Record<string, Validate>;
    message: string;
  };
}

const CheckBox: FC<ICheckBoxProps> = ( props ) => {
  const { register } = useFormContext()

  return (
    <div style={props.style} className={cx( 'w-100', {
      'd-flex justify-content-start align-items-center': props.type === 'checkbox',
    } )}>
      <input
        id={props.name}
        name={props.name}
        type={props.type}
        readOnly={props.readOnly}
        placeholder={props.placeholder}
        autoComplete={props.autocomplete}
        className={cx( props.className )}
        // TODO: Fix typings
        ref={register( {
          pattern: props.defaultValidation,
          validate: props.validateFunc,
          ...props.validation,
          required: props.required && `The field "${props.label}" is required.`,
        } as any ) as any}
      />
      <label
        className='d-flex align-items-center justify-content-center mb-0 ml-3'
        htmlFor={props.name}
        dangerouslySetInnerHTML={props.label && { __html: props.label }}
      />
    </div>
  );
}

export default CheckBox;
