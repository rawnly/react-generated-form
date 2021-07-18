import React from 'react'
import { GeneratedForm, GeneratedFormConfigProvider } from '.'
import { useForm, FormProvider } from 'react-hook-form'

import 'tailwindcss/tailwind.css';

export default {
  title: "GeneratedForm"
}


export const Form = () => {
  const methods = useForm()

  type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    acceptTerms: boolean;
    color: string;
  }

  return (
    <form style={{ maxWidth: 800, width: '80vw' }}>
      <FormProvider {...methods}>
        <GeneratedForm<FormData>
          structure={[
            [
              {
                label: "First Name",
                name: 'firstName',
                xs: 12,
                md: 6,
                lg: 6
              },
              {
                label: "Last Name",
                name: 'lastName',
                xs: 12,
                md: 6,
                lg: 6
              },
            ],
            [
              {
                label: "Email",
                name: 'email',
              },
            ], [
              {
                name: "acceptTerms",
                label: 'Accept Terms',
                type: 'checkbox'
              }
            ], [
              {
                name: 'color',
                label: 'Color',
                type: 'select',
                placeholder: 'Choose your favorite colour:',
                options: [
                  {
                    label: 'Red',
                    value: '#ff0000'
                  },
                  {
                    label: 'Green',
                    value: '#00ff00'
                  },
                  {
                    label: 'Blue',
                    value: '#0000ff'
                  },
                ]
              }
            ]
          ]}
        />
      </FormProvider>
    </form>

  )
}
