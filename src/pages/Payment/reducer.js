/* eslint-disable no-case-declarations */
import { produce } from 'immer';
import {
  FORM_SUBMISSION_FAILED,
  FORM_SUBMISSION_SUCCESS,
  FORM_VALIDATION_FAILED,
  LOAD_PREVIOUS_STEP_DATA,
  SET_CURRENT_STEP,
  SUBMIT_FORM,
  UPDATE_FORM,
  VALIDATE_FORM,
} from './constant';

// initialState.js
export const initialState = {
  currentStep: 1,
  formData: {
    step1: {},
    step2: {},
    step3: {},
    step4: {},
  },
  formErrors: {},
  isSubmissionSuccessful: false,
};

export const storedKey = ['currentStep', 'formData'];

const formReducer = produce((draft = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_STEP:
      draft.currentStep = action.payload;
      return draft;
    case UPDATE_FORM:
      const { step, data } = action.payload;
      draft.formData[`step${step}`] = data;
      return draft;
    case VALIDATE_FORM:
      return draft;
    case FORM_VALIDATION_FAILED:
      const { errors } = action.payload;
      draft.formErrors = errors;
      return draft;
    case SUBMIT_FORM:
      return draft;
    case FORM_SUBMISSION_SUCCESS:
      draft.isSubmissionSuccessful = true;
      return draft;
    case FORM_SUBMISSION_FAILED:
      draft.isSubmissionSuccessful = false;
      return draft;
    case LOAD_PREVIOUS_STEP_DATA:
      return draft;
    default:
      return draft;
  }
});

export default formReducer;
