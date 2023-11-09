import PropTypes from 'prop-types';
import FormPersonalInfo from '@components/FormStep1';
import Step from '@components/SidebarForm/step';
import PlanningPage from '@components/FormStep2';
import AddOns from '@components/FormStep3';
import FinishingForm from '@components/FormStep4';
import { connect, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import ThankYouForm from '@components/FormStep5';
import Classes from './style.module.scss';
import { setCurrentStep } from './action';
import { selectCurrentStep } from './selectors';

const PaymentPage = ({currentStep}) => {
  // const currentStep = useSelector(selectCurrentStep);
  const dispatch = useDispatch();

  const handleNextStep = () => {
    dispatch(setCurrentStep(currentStep + 1));
  };

  const handlePreviousStep = () => {
    dispatch(setCurrentStep(currentStep - 1));
  };

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return <FormPersonalInfo currentStep={currentStep} />;
      case 2:
        return (
          <PlanningPage
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
            currentStep={currentStep}
          />
        );
      case 3:
        return (
          <AddOns handleNextStep={handleNextStep} handlePreviousStep={handlePreviousStep} currentStep={currentStep} />
        );
      case 4:
        return (
          <FinishingForm
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
            currentStep={currentStep}
          />
        );
      case 5:
        return <ThankYouForm currentStep={currentStep} />;
      default:
        return <FormPersonalInfo currentStep={currentStep} />;
    }
  };

  return (
    <main>
      <div className={Classes.Container}>
        <div className={Classes.Steps}>
          <Step step={1} title={<FormattedMessage id="desc_step_1" />} active={currentStep === 1} />
          <Step step={2} title={<FormattedMessage id="desc_step_2" />} active={currentStep === 2} />
          <Step step={3} title={<FormattedMessage id="desc_step_3" />} active={currentStep === 3} />
          <Step step={4} title={<FormattedMessage id="desc_step_4" />} active={currentStep >= 4} />
        </div>
        <div className={Classes.content}>{renderFormStep()}</div>
      </div>
    </main>
  );
};

PaymentPage.propTypes = {
  currentStep: PropTypes.number,
};

const mapStateToProps = (state) => ({
  currentStep: selectCurrentStep(state),
});

export default connect(mapStateToProps)(PaymentPage);

// export default PaymentPage;
