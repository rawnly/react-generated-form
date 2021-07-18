import React, { FC, useEffect } from 'react';
import { useFormContext, ValidationRule } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import cx from 'classnames';

import { CommonFieldProps, CoordsFieldProps, SelectFieldProps } from '../types'

import { getDefaultRequiredText, hasHint, isCommonField, isSpecialType, needManualRegister } from '../utils'
import { validators, ERRORS } from '../utils/validators'

import CheckBox from './Fields/Checkbox';
import FieldLabel from './Fields/FieldLabel'
import SelectInput from './Fields/SelectInput';
import CoordinatesInput from './Fields/CoordinatesInput';
import TimeInput from './Fields/TimeInput';
import { GeneratedFormClassNames } from './GeneratedForm';
import { Except } from 'type-fest';
import { match } from 'ts-pattern'

export type FieldProps = ( CommonFieldProps | SelectFieldProps | CoordsFieldProps )

const CONFIRM_REGEX = /_confirm$|^confirm_/gi

type Props = FieldProps & {
  classNames: Except<GeneratedFormClassNames, 'inputGroup' | 'row'>
}



export const Field: FC<Props> = ( { classNames = {}, ...props } ) => {
  const { register, formState: { errors }, unregister } = useFormContext();

  let validateFunc;
  if ( CONFIRM_REGEX.test( props.name ) ) {
    validateFunc = ( values: any ) => values[props.name] === values[props.name.replace( CONFIRM_REGEX, '' )] || `Field doesn't match.`
  }

  const patternValidation: ValidationRule<RegExp> = match( props.type )
    .with( 'email', () => ( {
      value: validators.email.Common,
      message: ERRORS.email.invalid
    } ) )
    .with( 'url', () => ( {
      value: validators.url,
      message: ERRORS.url.invalid
    } ) )
    .otherwise( () => undefined )


  useEffect( () => {
    if ( needManualRegister( props.type ) ) {
      register( props.name, {
        pattern: patternValidation,
        ...props.validation,
        required: props.required && getDefaultRequiredText( props.label )
      } )

      return () => unregister( props.name )
    }
  }, [] )

  const inputClassNames = cx(
    props.className
  )

  const Component = isCommonField( props ) ? props.component : ( props: any ) => <input {...props} />;

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
          defaultValidation={patternValidation}
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
        <Component
          id={props.name}
          name={props.name}
          readOnly={props.readOnly}
          style={props.style}
          placeholder={props.placeholder}
          autoComplete={props.autocomplete}
          className={inputClassNames}
          {...register( props.name, {
            pattern: patternValidation,
            validate: validateFunc,
            ...props.validation,
            required: props.required && getDefaultRequiredText( props.label ),
          } ) as any}></Component>
      )}

      {/* Select Component */}
      {props.type === 'select' && (
        <SelectInput
          validateFunc={validateFunc}
          defaultValidation={patternValidation}
          className={inputClassNames as any}
          {...props}
        />
      )}


      {/* Standard Input */}
      {!isSpecialType( props.type ) && (
        <Component
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
          {...register( props.name, {
            pattern: patternValidation,
            validate: validateFunc,
            ...props.validation,
            required: props.required && getDefaultRequiredText( props.label ),
          } ) as any}
        />
      )}


      {!errors[props.name]
        ? hasHint( props ) && <small className={cx( classNames.hint )}>{props.hint || <>&nbsp;</>}</small>
        : (
          <small className={cx( classNames.error )}>
            <ErrorMessage errors={errors} name={props.name} />
          </small>
        )}
    </>
  );
}
