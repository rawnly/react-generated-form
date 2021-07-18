import { FieldProps } from '../components/Field'
import { CommonFieldProps, CommonFieldType, FieldType } from '../types'

export type SpecialType = 'checkbox' | 'coords' | 'time' | 'textarea' | 'select'

export const needManualRegister = ( type: FieldType ) =>
  type === 'coords'
  || type === 'time'
  || type === 'select'

export const getDefaultRequiredText = ( label: string ) =>
  `The field "${label}" is required.`

export const isCommonType = (type: FieldType) : type is CommonFieldType =>
  !isSpecialType(type)

export const isSpecialType = ( type: FieldType ): type is SpecialType => [
    'checkbox',
    'coords',
    'select',
    'textarea',
    'time'
  ].indexOf( type ) >= 0

export const hasHint = (props: FieldProps): boolean => props.hint && !props.noHint && props.type !== 'checkbox'

export const isTrue =  ( values, check ) =>
  check instanceof Function
    ? check( values )
    : typeof check === 'string'
      ? !!values[check]
      : check


export const buildSizeClassName = (template: string, size: number) => template.replace('$', `${size}`)


export const isCommonField = (props: FieldProps) : props is CommonFieldProps => {
  return !isSpecialType(props.type)
}
