import * as React from 'react'
import { Field, FieldProps } from '../src'
import { render } from 'enzyme'
import { useForm, FormProvider } from 'react-hook-form'


const FieldTestComponent = ( props ) => {
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <Field {...props} />
    </FormProvider>
  )
}

describe( 'Field component tests', () => {
  const fieldProps: FieldProps = {
    label: "memememem",
    name: 'password',
    hint: 'your password',
    type: 'password',
    placeholder: "Your Password"
  }


  it( 'Should render LABEL', () => {
    const wrapper = render( <FieldTestComponent {...fieldProps} /> )
    const label = wrapper.find( 'label' )

    expect( label.text() ).toBe( fieldProps.label )
    expect( label.prop( 'for' ) ).toBe( fieldProps.name )

  } )

  it( 'Should render INPUT', () => {
    const wrapper = render( <FieldTestComponent {...fieldProps} /> )
    const input = wrapper.find( 'input' )

    expect( input.hasClass( 'form-control' ) ).toBe( true )

    expect( input.attr( 'name' ) ).toBe( fieldProps.name )
    expect( input.attr( 'type' ) ).toBe( fieldProps.type )
    expect( input.attr( 'placeholder' ) ).toBe( fieldProps.placeholder )
  } )

  it( 'Should render the HINT', () => {
    const wrapper = render( <FieldTestComponent {...fieldProps} /> )
    expect( wrapper.children() ).toHaveLength( 3 )

    expect( wrapper.find( 'label' ).text() ).toBe( fieldProps.label )
    expect( wrapper.find( 'small.text-gray' ).text() ).toBe( fieldProps.hint )
  } )
} )
