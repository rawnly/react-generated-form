import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { GeneratedForm } from 'react-generated-form'


interface PageProps { }

const Page: NextPage<PageProps> = props => {
  const router = useRouter();
  const methods = useForm()

  const onSubmit = useCallback( async ( values ) => {

  }, [] )

  return (
    <div className='d-flex p-5 justify-content-center align-items-center flex-column w-screen h-screen'>
      <h2>Login</h2>
      <form
        onSubmit={methods.handleSubmit( onSubmit )}
        style={{ maxWidth: 400, width: '80vw' }}
      >
        <FormProvider {...methods}>
          <GeneratedForm
            structure={[
              [
                {
                  label: 'Email',
                  name: 'email',
                  type: 'email',
                  placeholder: 'luke@skywalker.me',
                  required: true,
                  noHint: true,
                },
              ], [
                {
                  label: 'Password',
                  name: 'password',
                  placeholder: 'Min 8 characters',
                  type: 'password',
                  required: true,
                  noHint: true,
                  validation: {
                    minLength: { value: 8, message: 'The password must be at least 8 characters.' },
                    maxLength: { value: 24, message: 'The password must have maximum 24 characters.' }
                  }
                }
              ]
            ]} />
        </FormProvider>

        <div style={{
          display: 'flex',
          flexDirection: 'column',

        }}>
          <button className='w-100 btn btn-primary'>
            Login
          </button>

          <small>
            <a href="https://github.com/rawnly/react-generated-form">
              Github Page
            </a>
          </small>
        </div>
      </form>
    </div>
  )
};


Page.displayName = 'LoginPage';

export default Page;
