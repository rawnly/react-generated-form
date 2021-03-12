import React, { FC } from "react";

interface IFieldLabelProps {
  name: string;
  label: string;
}

const FieldLabel: FC<IFieldLabelProps> = ( { name, label, children } ) => (
  <small className='font-bold'>
    <label className='mb-0' htmlFor={name} dangerouslySetInnerHTML={label && { __html: label }}>
      {children}
    </label>
  </small>
);


export default FieldLabel;
