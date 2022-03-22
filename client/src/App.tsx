import axios from 'axios';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Form, FormSpy } from 'react-final-form';

// Material-UI Imports
import Button from '@material-ui/core/Button';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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
  formRow: {
    margin: '5px',
    verticalAlign: 'top',
    width: '75vh',
  },
  left: {
    display: 'inline-block',
    margin: 'auto',
    width: '50%',
    verticalAlign: 'middle',
  },
  right: {
    display: 'inline-block',
    margin: 'auto',
    width: '50%',
    verticalAlign: 'middle',
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
  const [submitted, setSubmitted] = useState<boolean>(false);

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
          setSubmitted(true);
        }}
        subscription={{ }}
      >
      {({ handleSubmit, form, submitting }): any => (
        <form
          onSubmit={handleSubmit}
          id='sample-form'
        >
          <div className={styles.formRow}> 
            <div className={styles.left}>
              <Typography display="inline">Sample Size:</Typography>
            </div>
            <div className={styles.right}>
              <TextField 
                label=''
                name='samplesize'
                validate={validateSampleSize}
              />
            </div>
          </div>
          <div className={styles.formRow}> 
            <div className={styles.left}>
              <Typography display="inline">Sample Mean:</Typography>
            </div>
            <div className={styles.right}>
              <TextField 
                  label=''
                  name='samplemean'
                  validate={validateNumber}
                />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.left}>
              <Typography display="inline">Standard Deviation:</Typography>
            </div>
            <div className={styles.right}>
              <TextField 
                  label=''
                  name='standarddeviation'
                  validate={validateStandardDeviation}
              />
            </div>
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
          <div className={styles.formRow}> 
            <div className={styles.left}>
              <Typography display="inline">Hypothesized mean:</Typography>
            </div>
            <div className={styles.right}>
              <TextField 
                disabled={!isHypothetical}
                label=''
                name='hypothesizedmean'
                validate={validateHypothesis}
              />
            </div>
          </div>
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
                onClick={(): void =>  {
                  form.restart();
                  setSubmitted(false);
                }}
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
      { submitted ? 
      <TableContainer component={Paper}>
        <Table aria-label='Submission'>
          <TableBody>
            <TableRow>
              <TableCell>Sample Size</TableCell>
              <TableCell align='right'>{formData?.samplesize}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Sample Mean</TableCell>
              <TableCell align='right'>{formData?.samplemean}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Standard Deviation</TableCell>
              <TableCell align='right'>{formData?.standarddeviation}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Hypothesized Mean</TableCell>
              <TableCell align='right'>{formData?.hypothesizedmean}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer> : null }
    </Fragment>
  );
}
