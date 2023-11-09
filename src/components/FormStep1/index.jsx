/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setCurrentStep, updateForm } from '@pages/Payment/action';
import { selectFormDataForCurrentStep } from '@pages/Payment/selectors';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import Classes from './style.module.scss';

const FormPersonalInfo = ({ formData, onSubmit, currentStep }) => {
  const dispatch = useDispatch();
  const [localFormData, setLocalFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    // Validate localFormData instead of formData
    if (!localFormData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    // Ensure that localFormData.email is a string before calling match
    if (!localFormData.email || !localFormData.email.match(/^\S+@\S+\.\S+$/)) {
      newErrors.email = 'Valid email is required';
      isValid = false;
    }
    if (!localFormData.phone) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  useEffect(() => {
    if (formData) {
      setLocalFormData(formData);
    }
  }, [formData]);

  // console.log(formData, 'test');

  const handleNext = () => {
    if (validate()) {
      dispatch(updateForm(1, localFormData)); // Update the form data in Redux
      dispatch(setCurrentStep(2)); // Move to the next step in Redux
      if (onSubmit) onSubmit(localFormData); // If there's a submit handler passed down, call it
    }
  };

  return (
    <div className={Classes.info}>
      <h2>
        <FormattedMessage id="header_personal_info_form" />
      </h2>
      <p>
        <FormattedMessage id="decription_personal_info_form" />
      </p>
      <form className={Classes.form} autoComplete="on">
        <div className={Classes.fields}>
          <div className={Classes.dflex}>
            <label htmlFor="name">
              <FormattedMessage id="label_form_personal_info_name" />
            </label>
          </div>
          <input
            name="name"
            type="text"
            placeholder="e.g. Stephe king"
            value={localFormData.name}
            onChange={handleChange}
            className={errors.name ? Classes.errorField : ''}
          />
          {errors.name && <p className={Classes.error}>{errors.name}</p>}
        </div>
        <div className={Classes.fields}>
          <div className={Classes.dflex}>
            <label>
              <FormattedMessage id="label_form_personal_info_email" />
            </label>
          </div>
          <input
            name="email"
            type="text"
            inputMode="email"
            placeholder="e.g. Stepheking@lorem.com"
            value={localFormData.email}
            onChange={handleChange}
            className={errors.email ? Classes.errorField : ''}
          />
          {errors.email && <p className={Classes.error}>{errors.email}</p>}
        </div>
        <div className={Classes.fields}>
          <div className={Classes.dflex}>
            <label>
              <FormattedMessage id="label_form_personal_info_phone" />
            </label>
          </div>
          <input
            name="phone"
            type="text"
            placeholder="e.g. +1 234 567 890"
            inputMode="tel"
            value={localFormData.phone}
            onChange={handleChange}
            className={errors.phone ? Classes.errorField : ''}
          />
          {errors.phone && <p className={Classes.error}>{errors.phone}</p>}
        </div>
        <div className={currentStep === 1 ? `${Classes.navigation} ${Classes.btnRight}` : Classes.navigation}>
          <button onClick={handleNext} type="button" className={Classes.btn2}>
            <FormattedMessage id="button_text_next_step" />
          </button>
        </div>
      </form>
    </div>
  );
};

FormPersonalInfo.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }),
  onSubmit: PropTypes.func,
  currentStep: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  formData: (state) => selectFormDataForCurrentStep(state, 1),
});

export default connect(mapStateToProps)(FormPersonalInfo);
