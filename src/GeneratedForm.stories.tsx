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
    terms2: boolean;
    color: string;
  }

  return (
    <form className='absolute top-2/4 left-2/4 transform -translate-y-2/4 -translate-x-2/4' style={{ maxWidth: 600, width: '80vw' }}>
      <FormProvider {...methods}>
        <GeneratedForm<FormData>
          structure={[
            [
              {
                label: "First Name",
                name: 'firstName',
                autocomplete: 'name',
                placeholder: 'John',
                groupClassName: 'md:flex-5 mr-2',
              },
              {
                label: "Last Name",
                name: 'lastName',
                placeholder: 'Doe',
                autocomplete: 'surname',
                groupClassName: 'md:flex-5 ml-2',
              },
            ],
            [
              {
                label: "Email",
                name: 'email',
                placeholder: 'Your email address'
              },
            ], [
              {
                name: "acceptTerms",
                label: 'Accept Terms',
                type: 'checkbox',
                hint: 'some cool text'
              },
              {
                name: "terms2",
                label: 'Accept Terms again',
                type: 'checkbox',
                hint: 'some cool text'
              },
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
      <button type='submit' className="px-4 rounded shadow text-white font-semibold ml-auto py-2 bg-indigo-500 hover:bg-indigo-600">
        Submit
      </button>
    </form>
  )
}
