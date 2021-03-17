import { Except } from 'type-fest'
import { ClassValue } from 'classnames/types'
import { CSSProperties } from 'react'
import { Validate, ValidationRule } from 'react-hook-form';
import { AutocompletionRequest, LatLng } from 'react-google-places-autocomplete/build/GooglePlacesAutocomplete.types';

type CommonFieldType = 'address'
| 'text'
| 'email'
| 'url'
| 'date'
| 'range'
| 'number'
| 'textarea'
| 'checkbox'
| 'password'
| 'time';

export type FieldType = CommonFieldType | 'coords' | 'select'

export interface CommonFieldProps {
	// Unique identifier for the field `id` and `name`
	name: string;

	// The label displayed on top of the input
	label: string;

	// Input type, limited to supported types.
	type?: CommonFieldType;

	// Input placeholder
	placeholder?: string;

	// react-hook-form validation options.
	validation?: {
		min?: ValidationRule<number | string>;
    max?: ValidationRule<number | string>;
    maxLength?: ValidationRule<number | string>;
    minLength?: ValidationRule<number | string>;
	};

	// react-hook-form validate
	validate?:  Validate | Record<string, Validate> | {
    value: Validate | Record<string, Validate>;
    message: string;
	}

	// if true the input will be readonly
	readOnly?: boolean;

	// Autocomplete field
	autocomplete?: string | 'off';

	// Extra classnames
	className?: ClassValue | ClassValue[] | Record<string, boolean>;

	// Hint under the input
	hint?: string;

	// Required field
	required?: boolean;

	// ingore hint
	noHint?: boolean;

	// CSS
	style?: CSSProperties;
}

export interface CoordsFieldProps extends Except<CommonFieldProps, 'type'> {
	type: 'coords';
	googleApiKey: string;
	onResult?: ( props: CoordsFieldProps, value: google.maps.GeocoderResult & { coords: LatLng }, setValue: ( key: string, val: any ) => void ) => void;
	options?: {
		debounce?: number;
		minLengthAutocomplete?: number;
		autoCompletitionRequest?: AutocompletionRequest
		onFail?: (error: Error) => void;
	};
}

export type SelectOption = {
	label: string;
	value: string;
}

export interface SelectFieldProps extends Except<CommonFieldProps, 'type'> {
	type: 'select';
	options: SelectOption[];
}
