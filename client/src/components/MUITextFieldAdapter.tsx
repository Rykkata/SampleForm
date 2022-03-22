import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function MUITextFieldAdapter(props: Record<string, any>): any {
  const { input, name, ...rest } = props;

  const onChange = (evt: any): void => {
    evt.preventDefault();
    input.onChange(evt.target.value);
  };

  return (
    <TextField
      {...input}
      {...rest}
      id={`MuiTextFieldAdapter-${name}`}
      onChange={onChange}
    />
  );
}