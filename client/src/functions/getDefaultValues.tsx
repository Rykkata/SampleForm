import axios, { CancelToken } from 'axios';

import { FormValues } from '../classes/FormValues';

export default async function getMIDBStatus({ cancelToken, setInitialValues }: {
  cancelToken: CancelToken;
  setInitialValues: (formValues: FormValues | null) => void;
}): Promise<void> {
  let formValues: FormValues | null = null;    
  try {
    const response = await axios.get('http://localhost:3004/initial_data', { cancelToken });
    formValues = { ...response.data };
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }
  setInitialValues(formValues);
}