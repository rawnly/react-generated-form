import { render } from 'enzyme'
import * as React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { GeneratedForm } from '../src'


const TestComponent = () => {
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <GeneratedForm
        structure={[
          [
            {
              label: 'First Name',
              name: 'firstName',
            },
            {
              label: 'Last Name',
              name: 'lastName',
            }
          ],
          [
            {
              label: 'Email',
              name: 'email',
              type: 'email'
            }
          ]
        ]}
      />
    </FormProvider>
  )
}

describe( 'Field component tests', () => {
  it( 'Should render 3 Fields', () => {
    const wrapper = render( <TestComponent /> )
    expect( wrapper.find( 'input' ) ).toHaveLength( 3 )

  } )

} )
