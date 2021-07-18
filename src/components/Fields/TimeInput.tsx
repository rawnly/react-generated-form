import { FormattedInput } from "@buttercup/react-formatted-input";
import React, { FC } from "react";
import { useFormContext, Controller, Validate } from 'react-hook-form';
import { CommonFieldProps } from '../../types';
import { getDefaultRequiredText } from '../../utils';


interface ITimeInputProps extends CommonFieldProps {
  validateFunc: Validate<string> | Record<string, Validate<string>>;
}

const TimeInput: FC<ITimeInputProps> = ( { validateFunc: validate, ...props } ) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={props.name}
      control={control}
      rules={{
        validate,
        required: props.required && getDefaultRequiredText( props.label ),
      }}
      render={field =>
        <FormattedInput
          {...field}
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
    />
  );
}

export default TimeInput;
