import PropTypes from 'prop-types';
import Classes from './style.module.scss';
import { FormattedMessage } from 'react-intl';

const PlanItem = ({ img, title, price, selected, switchOff }) => (
  <div className={selected ? `${Classes.planCard} ${Classes.planClick}` : Classes.planCard}>
    <img src={img} alt={title} />
    <div className={Classes.title}>
      <h3>{title}</h3>
      <p>{price}</p>
      {switchOff && (
        <p style={{ color: '#174a89' }}>
          <FormattedMessage id="text_free" />
        </p>
      )}
    </div>
  </div>
);

PlanItem.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  switchOff: PropTypes.bool,
};

export default PlanItem;
