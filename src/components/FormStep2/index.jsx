import { useDispatch } from 'react-redux';
import PlanItem from '@components/PlanItem';
import { useState } from 'react';
import Arcade from '../../../public/images/icon-arcade.svg';
import Advanced from '../../../public/images/icon-advanced.svg';
import Pro from '../../../public/images/icon-pro.svg';
import Classes from './style.module.scss';

const PlanningPage = () => {
  const switchOff = useState(false);
  const dispatch = useDispatch();
  return (
    <div className={Classes.planInfo}>
      <h2>Select your plan</h2>
      <p>You have the option of monthly or yearly billing.</p>
      <div className={Classes.plansCrads}>
        <div>
          <PlanItem img={Arcade} title="Arcade" />
        </div>
        <div>
          <PlanItem img={Advanced} title="Advanced" />
        </div>
        <div>
          <PlanItem img={Pro} title="Pro" />
        </div>
      </div>
      <label htmlFor="plan" className={Classes.switch}>
        <span className={!switchOff ? Classes.switOn : ''}>Monthly</span>
        <input type="checkbox" name="plan" id="plan" />
        <span className={switchOff ? Classes.switOn : ''}>Yearly</span>
      </label>
    </div>
  );
}

export default PlanningPage;
