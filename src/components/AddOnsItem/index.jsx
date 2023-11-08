import { useDispatch } from 'react-redux';
import Classes from './style.module.scss';

const AddOnsItem = ({packs, onClickItem}) => {
  const dispatch = useDispatch();
  console.log(packs.addon, "ini di addonst item")
  return (
    <label
      className={
        !packs.addon ? `${Classes.dflex} ${Classes.pack}` : `${Classes.dflex} ${Classes.pack} ${Classes.planClick}`
      }
      htmlFor="Online Service"
    >
      <div className={Classes.dflex}>
        <input
          className={Classes.checkMark}
          type="checkbox"
          name={packs.title} id={packs.title} defaultChecked={packs.addon}
          onChange={() => {
            onClickItem(packs.title);
          }}
        />
        <div className={Classes.title}>
          <h3>{packs.title}</h3>
          <p>{packs.text}</p>
        </div>
      </div>
      <span>Price</span>
    </label>
  );
};

export default AddOnsItem;
