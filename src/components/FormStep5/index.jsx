import { FormattedMessage } from 'react-intl';
import Classes from './style.module.scss';
import thankyou from '../../../public/images/icon-thank-you.svg';

const ThankYouForm = () => (
  <div className={Classes.thanks}>
    <img src={thankyou} alt="Thank You" />
    <h2>
      <FormattedMessage id="title_finishing" />
    </h2>
    <p>
      <FormattedMessage id="desc_finishing" />
    </p>
  </div>
);

export default ThankYouForm;
