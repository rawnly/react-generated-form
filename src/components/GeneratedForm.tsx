import { ClassValue } from 'classnames/types';
import React from 'react';
import { GeneratedField, ExtendedFieldProps } from './GeneratedField'
import cx from 'classnames'

export type FormStructure<T, K extends keyof T = keyof T> = ( ExtendedFieldProps<T, K> )[][];


export type GeneratedFormClassNames = {
  input: ClassValue | ClassValue[] | Record<string, boolean>;
  inputGroup: ClassValue | ClassValue[] | Record<string, boolean>;
  label: ClassValue | ClassValue[] | Record<string, boolean>;
  hint: ClassValue | ClassValue[] | Record<string, boolean>;
  error: ClassValue | ClassValue[] | Record<string, boolean>;
  row: ClassValue | ClassValue[] | Record<string, boolean>;
  sizeClasses: {
    md: string,
    xs: string,
    lg: string,
  }
}

interface Props<T> {
  structure: FormStructure<T>;
  classNames?: Partial<GeneratedFormClassNames>
}

const defaultClassNames: GeneratedFormClassNames = {
  input: 'generatedForm__input',
  inputGroup: ['generatedForm__group', 'w-full'],
  label: 'generatedForm__label',
  hint: 'generatedForm__hint',
  row: 'generatedForm__row',
  error: 'generatedForm__error',
  sizeClasses: {
    xs: 'w-$--xs',
    md: 'w-$--md',
    lg: 'w-$--lg'
  }
}

export const GeneratedForm = <T extends {}>( {
  structure,
  classNames = defaultClassNames
}: Props<T> ) => {
  const classes = {
    ...defaultClassNames,
    ...classNames
  }

  return (
    <>
      {
        structure
          .map(
            ( fields, idx ) => (
              <div className={cx( classes.row )} key={idx}>
                {fields
                  .map( ( { className = classes.input, ...fieldProps }, idx ) => {
                    // if ( fieldProps.type === 'divider' ) return <hr key={idx} className='generateForm__separator' />

                    return (
                      <GeneratedField
                        key={idx}
                        {...fieldProps}
                        classNames={classes}
                        className={className}
                        totalFields={fields.length}
                      />
                    )
                  } )
                }
              </div>
            )
          )
      }
    </>
  )
}
