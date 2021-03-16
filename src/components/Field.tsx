import React, { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import cx from 'classnames';

import { CommonFieldProps, CoordsFieldProps, SelectFieldProps } from '../types'

import { getDefaultRequiredText, isSpecialType, needManualRegister } from '../utils'
import { validators } from '../utils/validators'

import CheckBox from './Fields/Checkbox';
import FieldLabel from './Fields/FieldLabel'
import SelectInput from './Fields/SelectInput';
import CoordinatesInput from './Fields/CoordinatesInput';
import TimeInput from './Fields/TimeInput';
import { GeneratedFormClassNames } from './GeneratedForm';
import { Except } from 'type-fest';

export type FieldProps = ( CommonFieldProps | SelectFieldProps | CoordsFieldProps )

const CONFIRM_REGEX = /_confirm$|^confirm_/gi

type Props = FieldProps & {
  classNames: Except<GeneratedFormClassNames, 'inputGroup' | 'row'>
}

export const Field: FC<Props> = ( { classNames, ...props } ) => {
  const { register, errors, unregister } = useFormContext();

  let validateFunc;
  if ( CONFIRM_REGEX.test( props.name ) ) {
    validateFunc = ( values: any ) => values[props.name] === values[props.name.replace( CONFIRM_REGEX, '' )] || `Field doesn't match.`
  }

  const defaultValidation: any = {};

  switch ( props.type ) {
    case 'email':
      defaultValidation.value = validators.email.Common;
      defaultValidation.message = 'Please enter a valid email address.';
      break;
    case 'url':
      defaultValidation.value = validators.url;
      defaultValidation.message = 'Please enter a valid url.';
      break;
    default:
      break;
  }

  useEffect( () => {
    if ( needManualRegister( props.type ) ) {
      register( props.name, {
        pattern: defaultValidation,
        ...props.validation,
        required: props.required && getDefaultRequiredText( props.label )
      } )

      return () => unregister( props.name )
    }
  }, [] )

  const inputClassNames = cx(
    props.className
  )

  return (
    <>
      {/* Display label if no checkbox */}
      {props.type !== 'checkbox' && (
        <FieldLabel {...props} className={classNames.label} />
      )}

      {/* Coords Component */}
      {props.type === 'coords' && (
        <CoordinatesInput
          className={inputClassNames}
          googleApiKey={props.googleApiKey}
          {...props}
        />
      )}

      {/* Checkbox Component */}
      {props.type === 'checkbox' && (
        <CheckBox
          defaultValidation={defaultValidation}
          validateFunc={validateFunc}
          {...props}
        />
      )}

      {/* Time Component */}
      {props.type === 'time' && (
        <TimeInput
          validateFunc={validateFunc}
          {...props}
        />
      )}

      {/* Textarea */}
      {props.type === 'textarea' && (
        <textarea
          id={props.name}
          name={props.name}
          readOnly={props.readOnly}
          style={props.style}
          placeholder={props.placeholder}
          autoComplete={props.autocomplete}
          className={inputClassNames}
          ref={register( {
            pattern: defaultValidation,
            validate: validateFunc,
            ...props.validation,
            required: props.required && getDefaultRequiredText( props.label ),
          } ) as any}></textarea>
      )}

      {/* Select Component */}
      {props.type === 'select' && (
        <SelectInput
          validateFunc={validateFunc}
          defaultValidation={defaultValidation}
          className={inputClassNames as any}
          {...props}
        />
      )}

      {/* Standard Input */}
      {!isSpecialType( props.type ) && (
        <input
          id={props.name}
          name={props.name}
          type={props.type}
          style={props.style}
          readOnly={props.readOnly}
          className={inputClassNames}
          placeholder={props.placeholder}
          autoComplete={props.autocomplete}
          min={props.validation?.min as string}
          max={props.validation?.max as string}
          ref={register( {
            pattern: defaultValidation,
            validate: validateFunc,
            ...props.validation,
            required: props.required && getDefaultRequiredText( props.label ),
          } ) as any}
        />
      )}

      {!errors[props.name]
        ? !props.noHint && <small className={cx( classNames.hint )}>{props.hint || <>&nbsp;</>}</small>
        : (
          <small className={cx( classNames.error )}>
            <ErrorMessage errors={errors} name={props.name} />
          </small>
        )}
    </>
  );
}
