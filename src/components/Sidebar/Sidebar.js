import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { filterToTransfers } from '../../store/ticketSlice';

import styles from './Sidebar.module.scss';

function Sidebar() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.tickets.filters);
  const currentFilters = useSelector((state) => state.tickets.currentFilters);

  const checkboxes = Object.keys(filters).map((item) => {
    const check = currentFilters.includes(item);
    return (
      <label className={styles.checkbox} key={item} htmlFor={item}>
        <input
          checked={check}
          id={item}
          value={item}
          name="transfer"
          type="checkbox"
          onChange={() => {
            dispatch(filterToTransfers({ item }));
          }}
        />
        <span />
        {filters[item]}
      </label>
    );
  });

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>Количество пересадок</h2>
      <fieldset className={styles.fieldset}>{checkboxes}</fieldset>
    </div>
  );
}

export default Sidebar;
