import { createContext } from 'react'
import { GeneratedFormClassNames } from '../components/GeneratedForm'

export const initialState: GeneratedFormClassNames = {
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

export const GeneratedFormConfigContext = createContext<Partial<GeneratedFormClassNames>>(initialState);
export const GeneratedFormConfigProvider = GeneratedFormConfigContext.Provider;
