import axios from 'axios';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Form } from 'react-final-form';

import CheckBox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

import { FormValues } from './classes/FormValues';
import getDefaultValues from './functions/getDefaultValues';
import TextField from './components/TextField';
import validNumber from './functions/validNumber';
import validPositiveNumber from './functions/validPositiveNumber';
import validWholeNumber from './functions/validWholeNumber';


function validateSampleSize(value: number): string | null {
  if (validWholeNumber({ value })) {
    if (value >= 2) {
      return null;
    }
  }

  return 'Please enter a whole number greater than 1'
}

function validateNumber(value: number): string | null {
  if (validNumber({ value })) {
      return null;
  }

  return 'Please enter a number'
}

function validateStandardDeviation(value: number): string | null {
  if (validPositiveNumber({ value })) {
      return null;
  }

  return 'Please enter a number greater than 0'
}

export default function App() {
  const cancelToken = useRef(axios.CancelToken.source());
  const [initialValues, setInitialValues] = useState<FormValues | null>(null);
  const [isHypothetical, setIsHypothetical] = useState<boolean>(false);

  useEffect((): void => {
    getDefaultValues({ cancelToken: cancelToken.current.token, setInitialValues });
  }, []);

  return (
    <Fragment>
      <Form 
        initialValues={initialValues}
        onSubmit={() => {}}
        subscription={{ }}
      >
      {({ handleSubmit, form }): any => (
        <form
          onSubmit={handleSubmit}
          id='bda-form'
        >
          <div> 
            <Typography display="inline">Sample Size:</Typography>
            <TextField 
              label='Sample Size'
              name='samplesize'
              validate={validateSampleSize}
            />
          </div>
          <div>
          <Typography display="inline">Sample Mean:</Typography>
          <TextField 
              label='Sample Mean'
              name='samplemean'
              validate={validateNumber}
            />
          </div>
          <div>
          <Typography display="inline">Standard Deviation:</Typography>
          <TextField 
              label='Standard Deviation'
              name='standarddeviation'
              validate={validateStandardDeviation}
            />
          </div>
          <div>
          <CheckBox 
            id='hypothesisTestCheckbox'
            name='hypothesistestcheckbox'
            onChange={(evt) => {
              setIsHypothetical(evt.target.checked);
            }}
          />
          <Typography display="inline">Hypothesized mean:</Typography>
          <TextField 
            disabled={!isHypothetical}
            label='Hypothesized mean'
            name='hypothesizedmean'
            validate={validateNumber}
          />
          </div>
        </form>
      )}
      </Form>
    </Fragment>
  );
}
