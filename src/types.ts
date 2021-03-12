import { Except } from 'type-fest'
import { ClassValue } from 'classnames/types'
import { CSSProperties } from 'react'
import { ValidationRule } from 'react-hook-form';

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
		min: ValidationRule<number | string>;
    max: ValidationRule<number | string>;
    maxLength: ValidationRule<number | string>;
    minLength: ValidationRule<number | string>;
	};

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

	options?: any;
	onResult?: ( props: CoordsFieldProps, value: any, setValue: ( key: string, val: any ) => void ) => void;
}

export interface SelectFieldProps extends Except<CommonFieldProps, 'type'> {
	type: 'select';

	// Required if the type is `select`
	options?: { value: string; label: string }[];
}
