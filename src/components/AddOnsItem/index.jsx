import PropTypes from 'prop-types';
import Classes from './style.module.scss';

const AddOnsItem = ({ pack, onClickItem }) => (
  <label
    className={
      !pack.addon ? `${Classes.dflex} ${Classes.pack}` : `${Classes.dflex} ${Classes.pack} ${Classes.planClick}`
    }
    htmlFor="Online Service"
  >
    <div className={Classes.dflex}>
      <input
        className={Classes.checkMark}
        type="checkbox"
        name={pack.title}
        id={pack.title}
        checked={pack.addon}
        onChange={onClickItem}
      />
      <div className={Classes.title}>
        <h3>{pack.title}</h3>
        <p>{pack.text}</p>
      </div>
    </div>
    <span>{`Price: ${pack.price.monthly}/month or ${pack.price.yearly}/year`}</span>
  </label>
);

AddOnsItem.propTypes = {
  pack: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    price: PropTypes.shape({
      monthly: PropTypes.number.isRequired,
      yearly: PropTypes.number.isRequired,
    }).isRequired,
    addon: PropTypes.bool.isRequired,
  }).isRequired,
  onClickItem: PropTypes.func.isRequired,
};
export default AddOnsItem;
