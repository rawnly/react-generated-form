import { Value as ClassValue } from 'classnames';
import React, { useContext } from 'react';
import { GeneratedField, ExtendedFieldProps } from './GeneratedField'
import cx from 'classnames'
import { GeneratedFormConfigContext, initialState } from '../utils/context';

export type FormStructure<T, K extends keyof T = keyof T> = ( ExtendedFieldProps<T, K> )[][];

export type GeneratedFormClassNames = {
  color?: string;
  input?: ClassValue | ClassValue[] | Record<string, boolean>;
  inputGroup?: ClassValue | ClassValue[] | Record<string, boolean>;
  label?: ClassValue | ClassValue[] | Record<string, boolean>;
  hint?: ClassValue | ClassValue[] | Record<string, boolean>;
  error?: ClassValue | ClassValue[] | Record<string, boolean>;
  row?: ClassValue | ClassValue[] | Record<string, boolean>;
}

interface Props<T> {
  structure: FormStructure<T>;
}

export const GeneratedForm = <T extends {}>( {
  structure
}: Props<T> ) => {
  const { color, ...configuration } = useContext( GeneratedFormConfigContext )

  const classes = {
    ...initialState,
    ...configuration,
    input: cx( initialState.input || configuration.input )
      .replace( '$color', color ),
  }

  return (
    <>
      {
        structure
          .map(
            ( fields, idx ) => (
              <div className={cx( classes.row )} key={idx}>
                {fields
                  .map( ( { className = classes.input, groupClassName = classes.inputGroup, ...fieldProps }, idx ) => {
                    // if ( fieldProps.type === 'divider' ) return <hr key={idx} className='generateForm__separator' />

                    return (
                      <GeneratedField
                        key={idx}
                        {...fieldProps}
                        className={cx(
                          classes.input,
                          className
                        )}
                        classNames={{
                          ...classes,
                          inputGroup: groupClassName
                        }}
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
