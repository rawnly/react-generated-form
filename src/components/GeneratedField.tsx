import React from 'react';

import cx from 'classnames';
import { useFormContext } from 'react-hook-form';
import { Except, SetRequired } from 'type-fest';

import { isTrue } from '../utils';
import { Field, FieldProps } from './Field';


export interface ExtendedFieldProps<T, K extends keyof T = keyof T> extends SetRequired<Except<FieldProps, 'name' | 'required'>, 'label'> {
  name: K;

  when?: ( ( values: T ) => boolean ) | boolean | K;
  required?: ( ( values: T ) => boolean ) | boolean;

  xs?: 2 | 4 | 6 | 8 | 10 | 12;
  md?: 2 | 4 | 6 | 8 | 10 | 12;
  lg?: 2 | 4 | 6 | 8 | 10 | 12;
}

export interface Divider extends Except<Partial<FieldProps>, 'type'> {
  type: 'divider'
}

export interface GeneratedFieldProps<T> extends ExtendedFieldProps<T> {
  totalFields: number;
}

export const GeneratedField = <T extends {}>( { totalFields, ...field }: GeneratedFieldProps<T> ) => {
  const { watch } = useFormContext();
  const values = watch();

  const {
    lg,
    md,
    xs = Math.floor( 12 / totalFields ),
  } = field

  if ( field.type === 'checkbox' ) {
    return (
      <div className="w-full mb-3">
        <Field
          required={isTrue( values, field.required )}
          {...field as FieldProps}
          name={field.name as string}
        />
      </div>
    );
  }

  if ( field.when && isTrue( values, field.when ) ) {
    return (
      <div className={cx( 'w-full mb-3', {
        [`md:w-${md}/12`]: !!md,
        [`sm:w-${xs}/12`]: !!xs,
        [`lg:w-${lg}/12`]: !!lg
      } )} >
        <Field
          required={isTrue( values, field.required )}
          {...field as FieldProps}
          name={field.name as string}
        />
      </div>
    )
  }

  return (
    <div className={cx( 'w-full mb-3', {
      [`md:w-${md}/12`]: !!md,
      [`sm:w-${xs}/12`]: !!xs,
      [`lg:w-${lg}/12`]: !!lg
    } )} >
      <Field
        required={isTrue( values, field.required )}
        {...field as FieldProps}
        name={field.name as string}
      />
    </div>
  )
}
