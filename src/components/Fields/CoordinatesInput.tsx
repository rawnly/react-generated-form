import { ClassValue } from 'classnames/types';
import React, { FC } from "react";
import GooglePlacesInput, { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';
import { useFormContext } from 'react-hook-form';
import { Except } from 'type-fest';
import { CoordsFieldProps } from '../../types';

interface ICoordinatesInputProps extends Except<CoordsFieldProps, 'className'> {
  className?: ClassValue;
}

const CoordinatesInput: FC<ICoordinatesInputProps> = ( {
  className,
  options = {
    debounce: 250,
  },
  ...props
} ) => {
  const { setValue } = useFormContext()

  return (
    <GooglePlacesInput
      key={props.name}
      apiKey={props.googleApiKey}
      debounce={options?.debounce}
      minLengthAutocomplete={options?.minLengthAutocomplete}
      autocompletionRequest={options?.autoCompletitionRequest}
      onLoadFailed={options?.onFail}
      selectProps={{
        className,
        name: props.name,
        onChange: async ( { value: { place_id } } ) => {
          try {
            const response = await geocodeByPlaceId( place_id )
            const place = response[0];
            const coords = await getLatLng( place )

            setValue( props.name, [coords.lat, coords.lng], { shouldValidate: false } )
            props.onResult && props.onResult( props, { ...place, coords }, setValue )
          } catch ( error ) {
            options?.onFail && options?.onFail( error );
          }
        },
      }}
    />
  );
}

export default CoordinatesInput;
