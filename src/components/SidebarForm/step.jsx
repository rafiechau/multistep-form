import React from 'react'
import Classes from './style.module.scss';

const Step = ({step,title,active, locale, theme}) => (
  <div className={Classes.Steps}>
    <div className={Classes.Step}>
      <span className={active ? `${Classes.stepNumber} ${Classes.active}` : Classes.stepNumber}>{step}</span>
      <div className={Classes.stepInfo}>
        <span>STEP {step}</span>
        <p>{title}</p>
      </div>
    </div>
  </div>
);

export default Step;
