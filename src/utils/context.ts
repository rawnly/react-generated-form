import { createContext } from 'react'
import { GeneratedFormClassNames } from '../components/GeneratedForm'

export const initialState: GeneratedFormClassNames = {
  accent: 'purple',
  input: 'rounded-md shadow-sm border border-gray-300 block w-full sm:text-sm p-2',
  inputGroup: 'w-full flex mb-2 flex-col items-start justify-start',
  label: 'block text-sm font-medium text-gray-700 mb-1',
  hint: 'mt-2 text-sm text-gray-500',
  row: 'flex flex-wrap mb-3',
  error: 'mt-2 text-sm text-red-600'
}

export const GeneratedFormConfigContext = createContext<Partial<GeneratedFormClassNames>>(initialState);
export const GeneratedFormConfigProvider = GeneratedFormConfigContext.Provider;
