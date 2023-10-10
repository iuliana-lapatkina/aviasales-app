import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sortTickets } from '../../store/ticketSlice';

import styles from './TicketSorting.module.scss';

function TicketSorting() {
  const dispatch = useDispatch();

  const sortItem = useSelector((state) => state.tickets.sort);

  const sortIds = ['low-cost', 'fast', 'optimal'];
  const sortList = ['Самый дешевый', 'Самый быстрый', 'Оптимальный'].map((filter, index) => {
    const id = sortIds[index];
    return (
      <li key={filter} className={sortItem === id ? `${styles.filterItem} ${styles.checked}` : styles.filterItem}>
        <button id={id} className={styles.filter} type="button" onClick={() => dispatch(sortTickets({ id }))}>
          {filter}
        </button>
      </li>
    );
  });

  return <ul className={styles.filters}>{sortList}</ul>;
}

export default TicketSorting;
