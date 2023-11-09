// utils/validateFormData.js

// Helper functions for different types of validation
const isRequired = (value) => value.trim() !== '';
const isEmail = (value) => /^\S+@\S+\.\S+$/.test(value);

// Define the validation for each step of the form
const stepValidations = {
  step1: (data) => {
    const errors = {};
    if (!isRequired(data.name)) {
      errors.name = 'Name is required';
    }
    if (!isRequired(data.email) || !isEmail(data.email)) {
      errors.email = 'Valid email is required';
    }
    if (!isRequired(data.phone)) {
      errors.phone = 'Phone number is required';
    }
    // Include any other fields that need to be validated
    return errors;
  },
  step2: (data) => {
    const errors = {};
    // Define validation for step 2 fields
    // ...
    return errors;
  },
  step3: (data) => {
    const errors = {};
    // Define validation for step 3 fields
    // ...
    return errors;
  },
  step4: (data) => {
    const errors = {};
    // Define validation for step 4 fields
    // ...
    return errors;
  },
};

// Main validation function
export const validateFormData = (step, data) => {
  // Ensure the validation function exists for the current step
  if (typeof stepValidations[`step${step}`] !== 'function') {
    throw new Error(`Validation function for step${step} is not defined`);
  }
  return stepValidations[`step${step}`](data);
};
