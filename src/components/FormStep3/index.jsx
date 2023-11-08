import AddOnsItem from '@components/AddOnsItem';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Classes from './style.module.scss';

const AddOns = () => {
  const [paks, setPaks] = useState([
    {
      title: 'Online service',
      text: 'Access to multiplayer games',
      price: {
        monthly: 1,
        yearly: 10,
      },
      addon: false,
    },
    {
      title: 'Larger storage',
      text: 'Extra 1TB of cloud save',
      price: {
        monthly: 2,
        yearly: 20,
      },
      addon: false,
    },
    {
      title: 'Customizable profile',
      text: 'Custom theme on your profile',
      price: {
        monthly: 2,
        yearly: 20,
      },
      addon: false,
    }
  ]);

  const onClickItem = () => {
    console.log(test);
  };

  console.log(paks)
  const dispatch = useDispatch();
  return (
    <div className={Classes.addonsInfo}>
      <h2>Pick add-ons</h2>
      <p>Add-ons help enhance your gaming experience.</p>
      <div className={Classes.packs}>
        {paks.map((e, i) => (
          <AddOnsItem key={i} packs={e} onClickItem={onClickItem} />
        ))}
      </div>
    </div>
  );
};

export default AddOns;
