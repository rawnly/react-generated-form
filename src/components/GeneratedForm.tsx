import { Argument } from 'classnames';
import React, { useContext } from 'react';
import { GeneratedField, ExtendedFieldProps } from './GeneratedField'
import cx from 'classnames'
import { GeneratedFormConfigContext, initialState } from '../utils/context';

export type FormStructure<T, K extends keyof T = keyof T> = ( ExtendedFieldProps<T, K> )[][];



export type GeneratedFormClassNames = {
  accent?: string;
  input?: Argument
  inputGroup?: Argument
  label?: Argument
  hint?: Argument
  error?: Argument
  row?: Argument
}

interface Props<T> {
  accent?: string;
  structure: FormStructure<T>;
}

export const GeneratedForm = <T extends {}>( {
  structure,
  accent
}: Props<T> ) => {
  const { accent: accentColor, ...configuration } = useContext( GeneratedFormConfigContext )

  const classes = {
    ...initialState,
    ...configuration,
    input: cx( initialState.input || configuration.input )
      .replace( '$color', accent ?? accentColor ),
  }

  return (
    <>
      {
        structure
          .map(
            ( fields, idx ) => (
              <div data-row={`row-${idx}`} className={cx( classes.row )} key={idx}>
                {fields
                  .map( ( { className = classes.input, groupClassName = classes.inputGroup, ...fieldProps }, idx ) => {
                    // if ( fieldProps.type === 'divider' ) return <hr key={idx} className='generateForm__separator' />

                    return (
                      <GeneratedField
                        key={idx}
                        {...fieldProps}
                        color={accent ?? accentColor}
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
