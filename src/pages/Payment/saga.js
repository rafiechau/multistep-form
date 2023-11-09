// formSaga.js

import { validateFormData } from '@utils/validationForData';
import { takeLatest, put, select } from 'redux-saga/effects';
import { formSubmissionFailed, formSubmissionSuccess, formValidationFailed, setCurrentStep } from './action';
import { SUBMIT_FORM, VALIDATE_FORM } from './constant';

function* handleValidateForm(action) {
  const { step, data } = action.payload;
  const errors = validateFormData(step, data);

  if (Object.keys(errors).length > 0) {
    // If there are errors, dispatch a validation failed action with those errors
    yield put(formValidationFailed(step, errors));
  } else {
    // If there are no errors, move to the next step
    yield put(setCurrentStep(step + 1));
  }
}

function* handleSubmitForm() {
  try {
    const state = yield select();
    // Perform any necessary processing with the form data before submitting
    // For now, we'll just simulate a successful submission
    yield put(formSubmissionSuccess());

    // In a real app, you might call an API to submit the form data
    // const result = yield call(api.submitForm, state.form.formData);
    // yield put(formSubmissionSuccess(result));
  } catch (error) {
    // If there's an error submitting the form, dispatch a submission failed action
    yield put(formSubmissionFailed(error.message));
  }
}

export default function* formSaga() {
  yield takeLatest(VALIDATE_FORM, handleValidateForm);
  yield takeLatest(SUBMIT_FORM, handleSubmitForm);
}
