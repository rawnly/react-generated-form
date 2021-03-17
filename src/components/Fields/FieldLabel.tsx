import { ClassValue } from 'classnames/types';
import React, { FC } from "react";
import cx from 'classnames'

interface IFieldLabelProps {
  name: string;
  label: string;
  className: ClassValue | ClassValue[] | Record<string, boolean>
}

const FieldLabel: FC<IFieldLabelProps> = ( { name, className, label, children } ) => (
  <small className={cx( className )}>
    <label htmlFor={name} dangerouslySetInnerHTML={label && { __html: label }}>
      {children}
    </label>
  </small>
);


export default FieldLabel;
