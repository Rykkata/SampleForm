import axios from 'axios';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Form } from 'react-final-form';

import { FormValues } from './classes/FormValues';
import getDefaultValues from './functions/getDefaultValues';
import TextField from './components/TextField';

export default function App() {
  const cancelToken = useRef(axios.CancelToken.source());
  const [initialValues, setInitialValues] = useState<FormValues | null>(null);

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
            <TextField 
              label='Sample size:'
              name='samplesize'
            />
          </div>
          <div>
          <TextField 
              label='Sample mean:'
              name='samplemean'
            />
          </div>
          <div>
          <TextField 
              label='Standard Deviation:'
              name='standarddeviation'
            />
          </div>
        </form>
      )}
      </Form>
    </Fragment>
  );
}
