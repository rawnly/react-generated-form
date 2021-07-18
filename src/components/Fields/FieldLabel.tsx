import { ClassValue } from 'classnames/types';
import React, { FC } from "react";
import cx from 'classnames'

interface IFieldLabelProps {
  name: string;
  label: string;
  className: ClassValue | ClassValue[] | Record<string, boolean>
}

const FieldLabel: FC<IFieldLabelProps> = ( { name, className, label } ) => (
  <label htmlFor={name} className={cx( className )}>
    {label}
  </label>
);


export default FieldLabel;
