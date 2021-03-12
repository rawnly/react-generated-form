import { ClassValue } from 'classnames/types';
import React, { FC } from "react";
import GooglePlacesInput, { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';
import { useFormContext } from 'react-hook-form';
import { Except } from 'type-fest';
import { CoordsFieldProps } from '../../types';

interface ICoordinatesInputProps extends Except<CoordsFieldProps, 'className'> {
  className?: ClassValue;
}

const CoordinatesInput: FC<ICoordinatesInputProps> = ( { className, ...props } ) => {
  const { setValue } = useFormContext()

  return (
    <GooglePlacesInput
      key={props.name}
      apiKey={props.googleApiKey}
      debounce={250}
      autocompletionRequest={{
        componentRestrictions: {
          country: ['it']
        },
        ...( props.options || {} ),
      }}
      selectProps={{
        name,
        className,
        onChange: async ( { value: { place_id } } ) => {
          try {
            const res = await geocodeByPlaceId( place_id )
            const coords = await getLatLng( res[0] )

            // do stuff with coords
            // setValue('address', res[0].formatted_address)

            setValue( props.name, [coords.lat, coords.lng], { shouldValidate: false } )
            props.onResult( props, { ...res, coords }, setValue )
          } catch ( error ) {
            console.error( error )
          }
        },
      }}
    />
  );
}

export default CoordinatesInput;
