import { render } from 'enzyme'
import * as React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { GeneratedForm } from '../src'


const RenderForm = ( { structure } ) => {
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <GeneratedForm structure={structure} />
    </FormProvider>
  )
}

describe( 'Field component tests', () => {
  const structure = [
    [
      {
        name: 'firstName',
        label: 'First Name',
        placeholder: 'John',
        type: 'text'
      },
      {
        name: 'lastName',
        label: 'Last Name',
        placeholder: 'Doe',
        type: 'text'
      },
    ], [
      {
        name: 'email',
        label: 'Email',
        placeholder: 'john.doe@gmail.com',
        type: 'email'
      }
    ], [
      {
        name: 'password',
        label: 'Password',
        placeholder: '********',
        type: 'password'
      }
    ]
  ]

  it( 'Should render 4 Fields', () => {
    const wrapper = render( <RenderForm structure={structure} /> )

    expect( wrapper.find( 'label' ) )
      .toHaveLength( 4 )

    expect( wrapper.find( 'input' ) )
      .toHaveLength( 4 )
  } )

  it( 'Should render correct labels', () => {
    const wrapper = render( <RenderForm structure={structure} /> )
    const labels = wrapper.find( 'label' );

    for ( const [index, field] of structure.flat().entries() ) {
      expect( labels.eq( index ).text() )
        .toEqual( field.label )
    }
  } )

  it( 'Should render correct placeholders', () => {
    const wrapper = render( <RenderForm structure={structure} /> )
    const placeholders = wrapper.find( 'input' );

    for ( const [index, field] of structure.flat().entries() ) {
      expect( placeholders.eq( index ).attr( 'placeholder' ) )
        .toEqual( field.placeholder )
    }
  } )

  it( 'Should render correct types', () => {
    const wrapper = render( <RenderForm structure={structure} /> )
    const types = wrapper.find( 'input' );

    for ( const [index, field] of structure.flat().entries() ) {
      expect( types.eq( index ).attr( 'type' ) )
        .toEqual( field.type ?? 'text' )
    }
  } )
} )
