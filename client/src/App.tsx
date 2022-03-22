import axios from 'axios';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Form, FormSpy } from 'react-final-form';

// Material-UI Imports
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import CheckBox from './components/CheckBox';
import { FormValues } from './classes/FormValues';
import getDefaultValues from './functions/getDefaultValues';
import TextField from './components/TextField';
import validNumber from './functions/validNumber';
import validPositiveNumber from './functions/validPositiveNumber';
import validWholeNumber from './functions/validWholeNumber';


const useStyles = makeStyles(() => ({
  button: {
    display: 'inline-block',
    margin: '5px',
    verticalAlign: 'top',
  },
}));

function validateSampleSize(value: string): string | null {
  if (validWholeNumber({ value })) {
    if (parseFloat(value) >= 2) {
      return null;
    }
  }

  return 'Please enter a whole number greater than 1'
}

function validateNumber(value: string): string | null {
  if (validNumber({ value })) {
      return null;
  }

  return 'Please enter a number'
}

function validateStandardDeviation(value: string): string | null {
  if (validPositiveNumber({ value })) {
      return null;
  }

  return 'Please enter a number greater than 0'
}

function activeValidate(value: string, isActive: boolean): string | null {
  if (!isActive ||  validNumber({ value })) {
      return null;
  }

  return 'Please enter a number'
}

export default function App() {
  const cancelToken = useRef(axios.CancelToken.source());
  const [formData, setFormData] = useState<FormValues | null>(null);
  const [initialValues, setInitialValues] = useState<FormValues | null>(null);
  const [isHypothetical, setIsHypothetical] = useState<boolean>(false);

  useEffect((): void => {
    getDefaultValues({ cancelToken: cancelToken.current.token, setInitialValues });
  }, []);

  const styles = useStyles();

  const validateHypothesis = (value: string): string | null => activeValidate(value, isHypothetical);

  return (
    <Fragment>
      <Form 
        initialValues={initialValues}
        onSubmit={(values): void => {
          setFormData(values as FormValues);
          console.log(values);
          console.log(formData);
        }}
        subscription={{ }}
      >
      {({ handleSubmit, form, submitting }): any => (
        <form
          onSubmit={handleSubmit}
          id='sample-form'
        >
          <div> 
            <Typography display="inline">Sample Size:</Typography>
            <TextField 
              label=''
              name='samplesize'
              validate={validateSampleSize}
            />
          </div>
          <div>
          <Typography display="inline">Sample Mean:</Typography>
          <TextField 
              label=''
              name='samplemean'
              validate={validateNumber}
            />
          </div>
          <div>
          <Typography display="inline">Standard Deviation:</Typography>
          <TextField 
              label=''
              name='standarddeviation'
              validate={validateStandardDeviation}
            />
          </div>
          <div>
          <CheckBox 
            id='hypothesischeckbox'
            label='Perform hypothesis test'
            name='hypothesischeckbox'
            onClick={(evt) => {
              setIsHypothetical(evt.target.checked);
            }}
          />
          <Typography display="inline">Hypothesized mean:</Typography>
          <TextField 
            disabled={!isHypothetical}
            label=''
            name='hypothesizedmean'
            validate={validateHypothesis}
          />
          </div>
          <Button
            className={styles.button}
            color='primary'
            disabled={submitting}
            id='form-submit-button'
            tabIndex={-1}
            type='submit'
            variant='contained'
          >
            OK
          </Button>
          <FormSpy subscription={{ pristine: true }}>
            {({ pristine }): any => (
              <Button
                className={styles.button}
                color='secondary'
                disabled={pristine}
                id='form-reset-button'
                onClick={(): void =>  form.restart()}
                tabIndex={-1}
                type='reset'
                variant='outlined'
              >
                Reset
              </Button>
            )}
          </FormSpy>
        </form>
      )}
      </Form>
    </Fragment>
  );
}
