/* eslint-disable jsx-a11y/label-has-associated-control */
import { useDispatch } from 'react-redux';
import Classes from './style.module.scss';

const FormPersonalInfo = () => {
  const dispatch = useDispatch();
  return (
    <div className={Classes.info}>
      <h2>Personal info</h2>
      <p>Please provide your name,email address,and phone number.</p>
      <form className={Classes.form} autoComplete="on">
        <div className={Classes.fields}>
          <div className={Classes.dflex}>
            <label htmlFor="name">Name</label>
          </div>
          <input type="text" autoComplete="on" placeholder="e.g. Stephe king" />
        </div>
        <div className={Classes.fields}>
          <div className={Classes.dflex}>
            <label>Email Address</label>
          </div>
          <input type="text" inputMode="email" placeholder="e.g. Stepheking@lorem.com" />
        </div>
        <div className={Classes.fields}>
          <div className={Classes.dflex}>
            <label>Phone Number</label>
          </div>
          <input type="text" placeholder="e.g. +1 234 567 890" inputMode="tel" />
        </div>
      </form>
    </div>
  );
};

export default FormPersonalInfo;
