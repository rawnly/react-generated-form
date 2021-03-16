import { NextPage } from 'next';
import React, { useEffect, useState } from "react";
import { GeneratedForm, FormStructure } from 'react-generated-form'
import { useForm, FormProvider } from 'react-hook-form'

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password_confirm: string;
}

const formStructure: FormStructure<FormData> = [
  // Section 1, Name and Surname
  [
    {
      when: true,
      name: 'firstName', // keyof FormData
      label: 'First Name',
      placeholder: 'John',
      required: true, // by default the error label will be `Field ${label} is required!`
      xs: 12, // 1 input per row on mobile
      md: 6 // 2 inputs on the same row if not mobile.
    },
    {
      when: true,
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
      when: true,
      name: 'email',
      label: 'Email',
      placeholder: 'you@domain.me',
      required: true,
      type: 'email', // Specify input type,
    }
  ],

  [{
    type: 'divider'
  }],

  // Section 3, Password and Validation
  [
    {
      when: true,
      name: 'password',
      label: 'Password',
      placeholder: '*********',
      hint: 'Must be 8-16 characters.', // You can also add an hint
      required: true,
      validation: {
        minLength: {
          value: 8,
          message: 'The password must be at least 8 characters.'
        },
        maxLength: {
          value: 16,
          message: 'The password must be maximum 16 characters.'
        }
      },
      type: 'password',
      xs: 12,
      md: 6
    },
    {
      name: 'password_confirm',
      label: 'Confirm Password',
      required: true,
      type: 'password',
      xs: 12,
      md: 6
    }
  ]
]

const Page: NextPage = ( _ ) => {
  const { ...methods } = useForm()
  // const v = methods.watch()

  // useEffect( () => {
  //   console.log( v )
  // }, [v] )

  return (
    <div className="page" >
      <h1>Form</h1>
      <form className='form' onSubmit={methods.handleSubmit( console.log )}>
        <FormProvider {...methods}>
          <GeneratedForm structure={formStructure} />
        </FormProvider>

        <button type='submit' className='btn btn-primary w-100'>
          Submit
        </button>
      </form>

      <style jsx>
        {`
          * {
            font-family: sans-serif;
          }

          .page {
            width: 100vw;
            height: 100vh;

            display: flex;
            justify-content: center;
            align-items: center;

            flex-direction: column;
          }

          form {
            width: 600px;
          }
        `}
      </style>
    </div>
  );
}

export default Page;
