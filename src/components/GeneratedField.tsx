import React, { useMemo } from 'react';

import cx from 'classnames';
import { useFormContext } from 'react-hook-form';
import { Except } from 'type-fest';

import { buildSizeClassName, isTrue } from '../utils';
import { Field, FieldProps } from './Field';
import { GeneratedFormClassNames } from './GeneratedForm';

type WatchKey = string;



export type ExtendedFieldProps<T, K extends keyof T = keyof T> = FieldProps & {
  name: K;
  label: string;

  required?: ( ( values: T ) => boolean ) | boolean;

  when?: ( ( values: T ) => boolean ) | boolean
  watch?: WatchKey[]

  xs?: 2 | 4 | 6 | 8 | 10 | 12;
  md?: 2 | 4 | 6 | 8 | 10 | 12;
  lg?: 2 | 4 | 6 | 8 | 10 | 12;
}

export interface Divider extends Except<Partial<FieldProps>, 'type'> {
  type: 'divider'
}

export type GeneratedFieldProps<T> = ExtendedFieldProps<T> & {
  totalFields: number;
  classNames: Except<GeneratedFormClassNames, 'row'>
}


export const GeneratedField = <T extends {}>( { totalFields, classNames, ...field }: GeneratedFieldProps<T> ) => {
  const { watch, getValues } = useFormContext();

  let values;
  if ( field.watch && field.when ) {
    values = watch( field.watch );
  } else {
    values = getValues()
  }

  const {
    lg,
    md,
    xs = Math.floor( 12 / totalFields ),
  } = field

  const lgClassName: string = useMemo( () => buildSizeClassName( classNames.sizeClasses.lg, lg ), [lg, classNames] )
  const mdClassName: string = useMemo( () => buildSizeClassName( classNames.sizeClasses.md, md ), [md, classNames] )
  const xsClassName: string = useMemo( () => buildSizeClassName( classNames.sizeClasses.xs, xs ), [xs, classNames] )


  if ( field.when && !isTrue( values, field.when ) ) return null;

  if ( field.type === 'checkbox' ) {
    return (
      <div className={cx( classNames.inputGroup )}>
        <Field
          {...field as unknown as FieldProps}
          classNames={classNames}
          required={isTrue( values, field.required )}
          name={field.name as string}
        />
      </div>
    );
  }

  return (
    <div className={cx( classNames.inputGroup, {
      [xsClassName]: !!xs,
      [mdClassName]: !!md,
      [lgClassName]: !!lg
    } )} >
      <Field
        classNames={classNames}
        required={isTrue( values, field.required )}
        name={field.name as string}
        {...field as unknown as FieldProps}
      />
    </div>
  )
}
