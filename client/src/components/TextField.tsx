import React from 'react';
import { Field, FieldMetaState, useField } from 'react-final-form';

// Material-UI Imports
import { makeStyles } from '@material-ui/core/styles';

import TextFieldAdapter from './MUITextFieldAdapter';

const useStyles = makeStyles(() => ({
  container: {
    display: 'inline-block',
    margin: '5px',
    verticalAlign: 'top',
    width: '182px',
  },
  field: {
    verticalAlign: 'top',
    width: '182px',
  },
}));

function validString<T>({ value }: { value: T }): boolean {
    return (typeof(value) === 'string' && value.length > 0);
}

function generateHelperText({ meta, validateOnRender }: {
    meta?: FieldMetaState<any>;
    validateOnRender?: boolean;
  }): { error: boolean; helperText: string } {
    let helperText = '';
    let error = meta != null && (validateOnRender || meta.touched) && meta.error;
    if (validString({ value: error })) {
      helperText = error;
      error = true;
    }
  
    return { error, helperText };
  }

type Props = {
  disabled?: boolean;
  label: string;
  name: string;
  parse?: (value: string) => string;
  rowsMax?: number;
  validate?: (value: any, allValues?: any) => string | null | Promise<string | null>;
  validateFields?: string[];
  validateOnRender?: boolean;
}

export default function TextField(props: Props): any {
  const { label, name, validateOnRender, ...rest } = props;

  const styles = useStyles();

  const { meta } = useField(name, { subscription: { error: true, touched: true } });
  const { error, helperText } = generateHelperText({ meta, validateOnRender });

  return (
    <div className={styles.container}>
      <Field
        {...rest}
        error={error}
        helperText={helperText}
        className={styles.field}
        component={TextFieldAdapter}
        label={label}
        name={name}
        type='text'
      />
    </div>
  );
}