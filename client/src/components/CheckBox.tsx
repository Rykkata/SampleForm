import React from 'react';

// Final Form Imports
import { Field } from 'react-final-form';

// Material-UI Imports
import MuiCheckBox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

type CheckBoxAdapterProps = {
  input: Record<string, any>;
  disabled: boolean;
  label: string;
  onClick?: (evt: any) => void; 
}

export function CheckBoxAdapter(props: CheckBoxAdapterProps): any {
  const { input, disabled, label, onClick } = props;
  const { checked } = input;

  return (
    <FormControlLabel
      control={
        <MuiCheckBox
          {...input}
          checked={checked}
          disabled={disabled}
          onClick={onClick}
          tabIndex={-1}
        />
      }
      label={label}
    />
  );
}

interface CheckBoxProps {
  label: string;
  name: string;
  id: string;
  disabled?: boolean;
  onClick?: (evt: any) => void; 
  validateFields?: string[];
}

export default function CheckBox(props: CheckBoxProps): any {
  const { disabled, label, name, onClick, id, validateFields, ...rest } = props;

  return (
    <div {...rest}>
      <Field
        component={CheckBoxAdapter as any}
        disabled={disabled}
        id={id}
        label={label}
        name={name}
        onClick={onClick}
        type='checkbox'
        validateFields={Array.isArray(validateFields) ? validateFields : []}
      />
    </div>
  );
}