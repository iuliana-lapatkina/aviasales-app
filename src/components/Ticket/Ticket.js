import React from 'react';

import Flight from '../Flight';

import styles from './Ticket.module.scss';

function Ticket() {
  return (
    <div className={styles.ticket}>
      <span className={styles.price}>Цена</span>
      <span className={styles['airline-logo']}>Лого</span>
      <Flight />
      <Flight />
    </div>
  );
}

export default Ticket;
