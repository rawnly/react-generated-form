<!-- omit in toc -->
# React JSON Form (ALPHA)
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


## Contributing
> SOON
