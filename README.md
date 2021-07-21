<!-- omit in toc -->
# React JSON Form
> Create forms with ease

<!-- omit in toc -->
### Table of Contents
- [Under The Hood](#under-the-hood)
- [Installation](#installation)
- [Usage](#usage)
- [Docs](#docs)
  - [Field Props](#field-props)
    - [`label: string`](#label-string)
    - [`name: string`](#name-string)
    - [`type?: <all the standard input types> | time | coords | select | checkbox` - by default is `text`](#type-all-the-standard-input-types--time--coords--select--checkbox---by-default-is-text)
    - [`placeholder?: string`](#placeholder-string)
    - [`hint?: string`](#hint-string)
    - [`noHint?: boolean`](#nohint-boolean)
    - [`required?: boolean | string`](#required-boolean--string)
    - [`validator: {}`](#validator-)
    - [`when?: (fields: FormFields) => boolean`](#when-fields-formfields--boolean)
    - [`watch?: string[]`](#watch-string)
    - [`xs?: number`](#xs-number)
    - [`md?: number`](#md-number)
    - [`lg?: number`](#lg-number)
- [Contributing](#contributing)



## Under The Hood
Unde the hood this packages uses `react-hook-form` to validate components and bootstrap for the style.


## Installation

```sh
  npm install react-generated-form

  # or

  yarn add react-generated-form
```

## Usage
```tsx
import { useForm, FormProvider } from 'react-hook-form'

// Import your CSS on top
import 'bootstrap/dist/bootstrap.min.css';

// Or just import component style
import 'react-generated-form/dist/style.css'

import {
  GeneratedForm,
  FormStructure,
  GeneratedFormConfigProvider,
} from 'react-generated-form'

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const formStructure : FormStructure<FormData> = [
  // Section 1, Name and Surname
  [
    {
      name: 'firstName', // keyof FormData
      label: 'First Name',
      placeholder: 'John',
      required: true, // by default the error label will be `Field ${label} is required!`
      groupClassName: 'w-2/4'
    },
    {
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'John',
      required: true,
      groupClassName: 'w-2/4'
    },
  ],
  // Section 2, Email
  [
    {
      name: 'email',
      label: 'Email',
      placeholder: 'you@domain.me',
      required: true,
      type: 'email', // Specify input type,
    }
  ],

  // Section 3, Password and Validation
  [
    {
      name: 'password',
      label: 'Password',
      placeholder: '*********',
      hint: 'Must be 8-16 characters.', // You can also add an hint
      required: true,
      groupClassName: 'w-2/4',
      validator: { // refer to react-hook-form API
        minLength: {
          value: 8,
          message: 'The password must be at least 8 characters.'
        },
        maxLength: {
          value: 16,
          message: 'The password must be maximum 16 characters.'
        }
      }
    },
    {
      // with the suffix `_confirm` the generated form
      // auto validates the fields, so you don't need to manually check values.
      name: 'password_confirm',
      label: 'Confirm Password',
      required: true,
      groupClassName: 'w-2/4'
    }
  ]


  function Form() {
    const methods = useForm<FormData>({
      mode: 'onSubmit'
    })

    const onSubmit = useCallback(...);

    return (
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <GeneratedForm<FormData>
            structure={formStructure}
          />
        </FormProvider>

        <div className='form-group'>
          <button type='submit'>
            Sign Up
          </button>
        </div>
      </form>
    )
  }


  {/* Later */}
  {/* You can change elements classnames */}

  ReactDOM.render(
    <GeneratedFormConfigProvider
      value={{
        accent: 'purple',
        input: 'rounded-md shadow-sm border border-gray-300 block w-full sm:text-sm p-2',
        inputGroup: 'w-full flex mb-2 flex-col items-start justify-start',
        label: 'block text-sm font-medium text-gray-700 mb-1',
        hint: 'mt-2 text-sm text-gray-500',
        row: 'flex flex-wrap mb-3',
        error: 'mt-2 text-sm text-red-600'
      }}
    >
      <Form />
    </GeneratedFormConfigProvider>
  )
]
```


## Docs
> (work in progress)
### Field Props
#### `label: string`
The label of the input
#### `name: string`
Name of the input (will be the key in the json)
#### `type?: <all the standard input types> | time | coords | select | checkbox` - by default is `text`
Type of the input, some types such as the `email` have special validation.
#### `placeholder?: string`
Placeholder of the input
#### `hint?: string`
A small text under the input
#### `noHint?: boolean`
Hide the hint
#### `required?: boolean | string`
Mark a field as required, the default error text will be `Field {label} is required.`
#### `validator: {}`
Some options to validate the value
#### `when?: (fields: FormFields) => boolean`
The input will be hidden until this function returns true
#### `watch?: string[]`
Tell the input which values to watch for the `when` function.
#### `xs?: number`
Column size on mobile
#### `md?: number`
Column size on tablet
#### `lg?: number`
Column size on desktop

## Contributing
Feel free to contribute in any way, or just open an issue ✌️
