import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import SummaryItem from '@components/SummaryItem';
import { setCurrentStep, updateForm } from '@pages/Payment/action';
import { useEffect, useState } from 'react';
import Classes from './style.module.scss';
import { FormattedMessage } from 'react-intl';

const FinishingForm = ({ handlePreviousStep, planData, addOnsData, currentStep }) => {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let newTotal = planData?.price || 0; // Start with the base plan price

    // Add the price of each selected add-on
    addOnsData?.addOns.forEach((addOn) => {
      if (addOn.addon) {
        // Use the appropriate price based on the billing cycle
        newTotal += planData.isYearlyBilling ? addOn.price.yearly : addOn.price.monthly;
      }
    });

    setTotal(newTotal); // Set the total price
  }, [planData, addOnsData]);

  const onConfirm = () => {
    // Gather all the data for persistence in Redux
    const confirmationData = {
      ...planData,
      selectedAddOns: addOnsData.addOns.filter((addOn) => addOn.addon), // Filter only selected add-ons
      total,
    };
    dispatch(updateForm(currentStep, confirmationData)); // Dispatch the update form action
    dispatch(setCurrentStep(currentStep + 1));
  };

  return (
    <div className={Classes.Finish}>
      <h2>
        <FormattedMessage id="header_finishing_form" />
      </h2>
      <p>
        <FormattedMessage id="description_finishing_form" />
      </p>
      <div className={Classes.payout}>
        {/* Display the selected plan and price */}
        <div className={Classes.title}>
          <h3>
            {planData?.plan} ({planData?.isYearlyBilling ? 'Yearly' : 'Monthly'})
          </h3>
          <span>${total}</span>
        </div>
        {/* Display the selected add-ons and their prices */}
        {addOnsData?.addOns.map(
          (addOn, index) =>
            addOn.addon && (
              <SummaryItem
                key={index}
                title={addOn.title}
                price={planData?.isYearlyBilling ? `$${addOn.price.yearly}` : `$${addOn.price.monthly}`}
                billingCycle={planData?.isYearlyBilling ? 'Yearly' : 'Monthly'}
              />
            )
        )}
      </div>
      {/* Display the total price */}
      <div className={Classes.total}>
        <p>Total</p>
        <span>
          +${total} ({planData?.isYearlyBilling ? 'Yearly' : 'Monthly'})
        </span>
      </div>
      <div className={Classes.navigation}>
        {/* Navigation buttons */}
        {currentStep !== 1 && (
          <button type="button" onClick={handlePreviousStep} className={Classes.btn1}>
            <FormattedMessage id="button_text_back_form" />
          </button>
        )}
        {currentStep === 4 && (
          <button onClick={onConfirm} type="button" className={Classes.btn2}>
            <FormattedMessage id="button_text_confirm_form" />
          </button>
        )}
      </div>
    </div>
  );
};

FinishingForm.propTypes = {
  handlePreviousStep: PropTypes.func,
  planData: PropTypes.object,
  addOnsData: PropTypes.object,
  currentStep: PropTypes.number.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  planData: state.form.formData.step2,
  addOnsData: state.form.formData.step3,
  currentStep: ownProps.currentStep,
});

export default connect(mapStateToProps)(FinishingForm);
