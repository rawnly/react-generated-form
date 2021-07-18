import { Except } from 'type-fest'
import { Value as ClassValue } from 'classnames'
import { CSSProperties } from 'react'
import { ValidationRule } from 'react-hook-form';
import { AutocompletionRequest, LatLng } from 'react-google-places-autocomplete/build/GooglePlacesAutocomplete.types';

export type CommonFieldType = 'address'
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

export interface CommonFieldProps<T = any> {
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

	// if true the input will be readonly
	readOnly?: boolean;

	// Autocomplete field
	autocomplete?: string | 'off';

	// Extra classnames
	className?: ClassValue | ClassValue[] | Record<string, boolean>;

	groupClassName?: ClassValue | ClassValue[] | Record<string, boolean>;

	// Hint under the input
	hint?: string;

	// Required field
	required?: boolean;

	// ingore hint
	noHint?: boolean;

	// CSS
	style?: CSSProperties;

	component?: React.ComponentType<T>;
}

export interface CoordsFieldProps extends Except<CommonFieldProps, 'type' | 'component'> {
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

export interface SelectFieldProps extends Except<CommonFieldProps, 'type' | 'component'> {
	type: 'select';
	options: SelectOption[];
}
