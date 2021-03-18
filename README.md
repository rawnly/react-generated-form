<!-- omit in toc -->
# React JSON Form
> Create forms with ease

<!-- omit in toc -->
### Table of Contents
- [Under The Hood](#under-the-hood)
- [Installation](#installation)
- [Usage](#usage)
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
      xs: 12, // 1 input per row on mobile
      md: 6 // 2 inputs on the same row if not mobile.
    },
    {
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'John',
      required: true, // by default the error label will be `Field ${label} is required!`,
      xs: 12,
      md: 6
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
      xs: 12 // We can skip this, it's the default behaviour
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
      validator: { // refer to react-hook-form API
        minLength: {
          value: 8,
          message: 'The password must be at least 8 characters.'
        },
        maxLength: {
          value: 16,
          message: 'The password must be maximum 16 characters.'
        }
      },
      xs: 12,
      md: 6
    },
    {
      name: 'password_confirm', // with the suffix `_confirm` the form auto validates the fields, so you don't need to manually check values.
      label: 'Confirm Password',
      required: true,
      xs: 12,
      md: 6
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
          <GeneratedForm<FormData> structure={formStructure}>
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
  {/* Example with bootstrap classes */}
  ReactDOM.render(
    <GeneratedFormConfigProvider
      value={{
        input: 'form-control w-100',
        inputGroup: 'd-flex flex-column mb-3',
        label: 'mb-1',
        error: 'text-danger',
        hint: 'text-muted',
        row: 'row',
        sizeClasses: {
          lg: 'col-lg-$',
          md: 'col-md-$',
          xs: 'col-sm-$'
        }
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


