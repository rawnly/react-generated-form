import React, { FC } from "react";

interface IFieldLabelProps {
  name: string;
  label: string;
}

const FieldLabel: FC<IFieldLabelProps> = ( { name, label, children } ) => (
  <small className='generatedForm__label'>
    <label htmlFor={name} dangerouslySetInnerHTML={label && { __html: label }}>
      {children}
    </label>
  </small>
);


export default FieldLabel;
