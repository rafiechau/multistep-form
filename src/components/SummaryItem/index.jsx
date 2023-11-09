import PropTypes from 'prop-types';
import Classes from './style.module.scss';

const SummaryItem = ({ title, price, billingCycle }) => (
  <div className={Classes.addFinish}>
    <p>{title}</p>
    <span>
      +${price}/ ({billingCycle})
    </span>
  </div>
);

SummaryItem.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  billingCycle: PropTypes.string.isRequired,
};

export default SummaryItem;
