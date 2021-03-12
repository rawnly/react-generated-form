import React from 'react';
import { GeneratedField, ExtendedFieldProps, Divider } from './GeneratedField'

export type FormStructure<T, K extends keyof T = keyof T> = ( ExtendedFieldProps<T, K> | Divider )[][];

interface Props<T> {
  structure: FormStructure<T>;
}

export const GeneratedForm = <T extends {}>( props: Props<T> ) => (
  <>
    {
      props.structure
        .map(
          ( fields, idx ) => (
            <div className='flex flex-wrap' key={idx}>
              {fields
                .map( ( fieldProps, idx ) => {
                  if ( fieldProps.type === 'divider' ) return <hr key={idx} className='my-3' />

                  return (
                    <GeneratedField
                      key={idx}
                      {...fieldProps}
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
