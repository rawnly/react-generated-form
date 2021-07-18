/**
 * @description Commonly used Regex
 * @url https://digitalfortress.tech/tricks/top-15-commonly-used-regex/
 */
 export const validators = {
	numbers: {
		Whole: /^\d+$/gm,
		Decimals: /^\d*\.\d+$/gm,
		WholeDecimal: /^\d*(\.\d+)?$/gm,
		NegativePositiveWholeDecimals: /^-?\d*(\.\d+)?$/gm,
		WholeDecimalFractions: /[-]?[0-9]+[,.]?[0-9]*([\/][0-9]+[,.]?[0-9]*)*/gm,
	},
	alphanumeric: {
		WithoutSpaces: /^[a-zA-Z0-9]*$/gm,
		WithSpaces: /^[a-zA-Z0-9 ]*$/gm,
		slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/gm,
		duplicates: /(\b\w+\b)(?=.*\b\1\b)/gm,
	},
	email: {
		Common: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/gm,
		UnCommon: /^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/gm,
	},
	url: /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gm,
	password: {
		Complex: /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/gm, // Should have 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and be at least 8 characters long
		Moderate: /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/gm, //  Should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long
	},
};


type DeeplyRequired<T extends object> = {
	[K in keyof T]-?: T[K] extends object
		? DeeplyRequired<T[K]>
		: T[K];
};


export type ErrorMessages = Partial<{
	email: {
	  invalid?: string;
	},
	url: {
	  invalid?: string;
	},
	number: {
	  invalid?: string;
	  min?: string;
	  max?: string;
	},
	general: {
	  invalid?: string;
	  maxLength?: string;
	  minLength?: string;
	  required?: string;
	}
  }>

export const ERRORS: DeeplyRequired<ErrorMessages> = {
	email: {
	  invalid: 'Please enter a valid email address.'
	},
	url: {
	  invalid: 'Please enter a valid URL.'
	},
	number: {
	  invalid: 'Please enter a valid number.',
	  max: 'Max value is {{value}}.',
	  min: 'Min value is {{value}}.'
	},
	general: {
	  invalid: 'Please enter a valid value.',
	  maxLength: 'Too long. Max {{value}} characters.',
	  minLength: 'Must be at least {{value}} characters.',
	  required: 'The field "{{label}}" is required'
	}
  }
