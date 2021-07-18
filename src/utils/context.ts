import { createContext } from 'react'
import { GeneratedFormClassNames } from '../components/GeneratedForm'

export const initialState: GeneratedFormClassNames = {
  color: 'indigo',
  input: 'shadow-sm focus:ring-$color-500 focus:border-$color-500 block w-full sm:text-sm border-gray-300 rounded-md"',
  inputGroup: 'w-full flex flex-col items-center justify-start',
  label: 'block text-sm font-medium text-gray-700',
  hint: 'mt-2 text-sm text-gray-500',
  row: 'flex flex-wrap space-x-2',
  error: 'mt-2 text-sm text-red-600'
}

export const GeneratedFormConfigContext = createContext<Partial<GeneratedFormClassNames>>(initialState);
export const GeneratedFormConfigProvider = GeneratedFormConfigContext.Provider;
