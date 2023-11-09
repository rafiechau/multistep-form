import PropTypes from 'prop-types';
import AddOnsItem from '@components/AddOnsItem';
import { connect, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { updateForm } from '@pages/Payment/action';
import { selectFormDataForCurrentStep } from '@pages/Payment/selectors';
import { createStructuredSelector } from 'reselect';

import Classes from './style.module.scss';
import { FormattedMessage } from 'react-intl';

const AddOns = ({ handleNextStep, handlePreviousStep, currentStep, formData }) => {
  const dispatch = useDispatch();

  const [paks, setPaks] = useState(
    formData.addOns || [
      {
        title: 'Online service',
        text: 'Access to multiplayer games',
        price: {
          monthly: 1,
          yearly: 10,
        },
        addon: false,
      },
      {
        title: 'Larger storage',
        text: 'Extra 1TB of cloud save',
        price: {
          monthly: 2,
          yearly: 20,
        },
        addon: false,
      },
      {
        title: 'Customizable profile',
        text: 'Custom theme on your profile',
        price: {
          monthly: 2,
          yearly: 20,
        },
        addon: false,
    }
    ]
  );

  useEffect(
    () => () => {
      dispatch(updateForm(currentStep, { addOns: paks }));
    },
    [paks, dispatch]
  );

  const onClickItem = (index) => {
    const newPaks = [...paks];
    newPaks[index] = { ...newPaks[index], addon: !newPaks[index].addon };
    setPaks(newPaks);
  };

  // Function to handle the next step navigation
  const onNextStep = () => {
    dispatch(updateForm(currentStep, { addOns: paks }));
    handleNextStep();
  };

  // Function to handle the previous step navigation
  const onPreviousStep = () => {
    handlePreviousStep();
  };

  return (
    <div className={Classes.addonsInfo}>
      <h2>
        <FormattedMessage id="header_add_ons_form" />
      </h2>
      <p>
        <FormattedMessage id="description_add_ons_form" />
      </p>
      <div className={Classes.packs}>
        {paks.map((pack, index) => (
          <AddOnsItem key={index} pack={pack} onClickItem={() => onClickItem(index)} />
        ))}
      </div>
      <div className={Classes.navigation}>
        {currentStep !== 1 && (
          <button type="button" onClick={onPreviousStep} className={Classes.btn1}>
            <FormattedMessage id="button_text_back_form" />
          </button>
        )}
        {currentStep < 4 && (
          <button onClick={onNextStep} type="button" className={Classes.btn2}>
            <FormattedMessage id="button_text_next_step" />
          </button>
        )}
      </div>
    </div>
  );
};

AddOns.propTypes = {
  handleNextStep: PropTypes.func,
  handlePreviousStep: PropTypes.func,
  currentStep: PropTypes.number.isRequired,
  formData: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  formData: (state, ownProps) => selectFormDataForCurrentStep(state, ownProps.currentStep),
});

export default connect(mapStateToProps)(AddOns);

// export default AddOns;
