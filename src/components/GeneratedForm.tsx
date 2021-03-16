import { ClassValue } from 'classnames/types';
import React from 'react';
import { GeneratedField, ExtendedFieldProps, Divider } from './GeneratedField'

import '../style/style.scss';


export type FormStructure<T, K extends keyof T = keyof T> = ( ExtendedFieldProps<T, K> | Divider )[][];

interface Props<T> {
  structure: FormStructure<T>;
  inputClassName?: ClassValue | ClassValue[] | Record<string, boolean>;
}

export const GeneratedForm = <T extends {}>( { structure, inputClassName = 'generatedForm__input' }: Props<T> ) => (
  <>
    {
      structure
        .map(
          ( fields, idx ) => (
            <div className='generatedForm__row' key={idx}>
              {fields
                .map( ( { className = inputClassName, ...fieldProps }, idx ) => {
                  if ( fieldProps.type === 'divider' ) return <hr key={idx} className='generateForm__separator' />

                  return (
                    <GeneratedField
                      key={idx}
                      {...fieldProps}
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
