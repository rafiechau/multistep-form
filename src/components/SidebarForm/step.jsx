import React from 'react'
import PropTypes from 'prop-types';
import Classes from './style.module.scss';

const Step = ({ step, title, active }) => (
  <div className={Classes.Step}>
    <span className={active ? `${Classes.stepNumber} ${Classes.active}` : Classes.stepNumber}>{step}</span>
    <div className={Classes.stepInfo}>
      <span>STEP {step}</span>
      <p>{title}</p>
    </div>
  </div>
);

Step.propTypes = {
  step: PropTypes.number.isRequired,
  title: PropTypes.node.isRequired,
  active: PropTypes.bool.isRequired,
};

export default Step;
