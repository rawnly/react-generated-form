import { FormattedInput } from "@buttercup/react-formatted-input";
import React, { FC } from "react";
import { useFormContext } from 'react-hook-form';
import { RHFInput } from 'react-hook-form-input';
import { Validate } from 'react-hook-form-input/dist/types';
import { CommonFieldProps } from '../../types';


interface ITimeInputProps extends CommonFieldProps {
  validateFunc: Validate | Record<string, Validate> | {
    value: Validate | Record<string, Validate>;
    message: string;
  };
}

const TimeInput: FC<ITimeInputProps> = ( { validateFunc: validate, ...props } ) => {
  // Do your stuff here,
  const { register } = useFormContext()

  return (
    <RHFInput
      name={props.name}
      register={register}
      as={
        <FormattedInput
          type={'text'}
          readOnly={props.readOnly}
          placeholder={props.placeholder}
          autoComplete={props.autocomplete}
          style={props.style}
          className={props.className}
          format={[
            { char: /\d/, repeat: 2 },
            { exactly: ":" },
            { char: /\d/, repeat: 2 },
            { exactly: " " },
            { exactly: "-" },
            { exactly: " " },
            { char: /\d/, repeat: 2 },
            { exactly: ":" },
            { char: /\d/, repeat: 2 },
          ]}
        />
      }
      rules={{
        validate,
        required: props.required && `The field "${props.label}" is required.`,
      }}
    />
  );
}

export default TimeInput;
