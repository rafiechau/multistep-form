import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import PlanItem from '@components/PlanItem';
import { useEffect, useState } from 'react';
import { updateForm } from '@pages/Payment/action';
import { selectFormDataForCurrentStep } from '@pages/Payment/selectors';
import { FormattedMessage } from 'react-intl';

import { createStructuredSelector } from 'reselect';
import Arcade from '../../../public/images/icon-arcade.svg';
import Advanced from '../../../public/images/icon-advanced.svg';
import Pro from '../../../public/images/icon-pro.svg';

import Classes from './style.module.scss';

const plansData = {
  Arcade: { monthly: 9, yearly: 90 },
  Advanced: { monthly: 12, yearly: 120 },
  Pro: { monthly: 15, yearly: 150 },
};

const PlanningPage = ({ handleNextStep, handlePreviousStep, currentStep, formData }) => {
  const dispatch = useDispatch();

  const [selectedPlan, setSelectedPlan] = useState(formData.plan || null);
  const [isYearlyBilling, setIsYearlyBilling] = useState(formData.isYearlyBilling || false);

  useEffect(() => {
    if (formData) {
      setSelectedPlan(formData.plan || 'Arcade');
      setIsYearlyBilling(formData.isYearlyBilling || false);
    }
  }, [formData]);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    dispatch(
      updateForm(currentStep, {
        ...formData,
        plan,
        isYearlyBilling,
        price: isYearlyBilling ? plansData[plan].yearly : plansData[plan].monthly,
      })
    );
  };

  const handleBillingCycleSwitch = () => {
    const newBillingCycle = !isYearlyBilling;
    setIsYearlyBilling(newBillingCycle);
    dispatch(
      updateForm(currentStep, {
        ...formData,
        plan: selectedPlan,
        isYearlyBilling: newBillingCycle,
        price: newBillingCycle ? plansData[selectedPlan].yearly : plansData[selectedPlan].monthly,
      })
    );
  };

  const getPlanPriceText = (plan) => {
    const price = isYearlyBilling ? `${plansData[plan].yearly}/year` : `${plansData[plan].monthly}/month`;
    const freeMonths = isYearlyBilling && plan === 'Pro' ? ' (2 months free)' : '';
    return `$${price} ${plan}${freeMonths}`;
  };

  return (
    <div className={Classes.planInfo}>
      <h2>
        <FormattedMessage id="header_planning_form" />
      </h2>
      <p>
        <FormattedMessage id="description_planning_form" />
      </p>
      <div className={Classes.plansCards}>
        {Object.entries(plansData).map(([key, value]) => (
          <div key={key} onClick={() => handleSelectPlan(key)}>
            <PlanItem
              img={key === 'Arcade' ? Arcade : key === 'Advanced' ? Advanced : Pro}
              title={key}
              price={getPlanPriceText(key)}
              selected={selectedPlan === key}
              switchOff={isYearlyBilling}
            />
          </div>
        ))}
      </div>
      <label htmlFor="plan" className={Classes.switch}>
        {/* Corrected the className logic */}
        <span className={!isYearlyBilling ? Classes.switOn : ''}>
          <FormattedMessage id="text_monthly" />
        </span>
        <input type="checkbox" name="plan" id="plan" checked={isYearlyBilling} onChange={handleBillingCycleSwitch} />
        <span className={isYearlyBilling ? Classes.switOn : ''}>
          <FormattedMessage id="text_yearly" />
        </span>
      </label>
      <div className={currentStep === 1 ? `${Classes.navigation} ${Classes.btnRight}` : Classes.navigation}>
        {currentStep !== 1 && (
          <button type="button" onClick={handlePreviousStep} className={Classes.btn1}>
            <FormattedMessage id="button_text_back_form" />
          </button>
        )}
        {currentStep < 4 && (
          <button onClick={handleNextStep} type="button" className={Classes.btn2}>
            <FormattedMessage id="button_text_next_step" />
          </button>
        )}
      </div>
    </div>
  );
};

PlanningPage.propTypes = {
  handleNextStep: PropTypes.func,
  handlePreviousStep: PropTypes.func,
  currentStep: PropTypes.number.isRequired,
  formData: PropTypes.shape({
    plan: PropTypes.string,
    isYearlyBilling: PropTypes.bool,
    price: PropTypes.number,
  }),
};

const mapStateToProps = createStructuredSelector({
  formData: (state, ownProps) => selectFormDataForCurrentStep(state, ownProps.currentStep),
});

export default connect(mapStateToProps)(PlanningPage);
