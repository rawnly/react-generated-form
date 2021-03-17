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

  const $selectors = {
    label: {
      tag: 'label',
      className: '',
      attrs: {
        for: fieldProps.name,
        text: fieldProps.label
      }
    },
    hint: {
      tag: 'small',
      className: 'generatedForm__hint',
      attrs: {
        text: fieldProps.hint
      }
    },
    input: {
      tag: 'input',
      className: 'generatedForm__input',
      attrs: {
        name: fieldProps.name,
        placeholder: fieldProps.placeholder,
        type: fieldProps.type
      }
    }
  }


  it( 'Should render LABEL', () => {
    const { tag, attrs } = $selectors.label

    const wrapper = render( <FieldTestComponent {...fieldProps} /> )
    const label = wrapper.find( tag )

    expect( label.text() ).toBe( attrs.text )
    expect( label.prop( 'for' ) ).toBe( attrs.for )
  } )

  it( 'Should render INPUT', () => {
    const wrapper = render( <FieldTestComponent {...fieldProps} /> )
    const {
      tag,
      attrs
    } = $selectors.input;

    const input = wrapper.find( tag )

    expect( input.attr( 'name' ) ).toBe( attrs.name )
    expect( input.attr( 'type' ) ).toBe( attrs.type )
    expect( input.attr( 'placeholder' ) ).toBe( attrs.placeholder )
  } )
} )
