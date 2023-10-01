import React from 'react';

import Ticket from '../Ticket';

import styles from './TicketList.module.scss';

function TicketList() {
  return (
    <ul className={styles['task-list']}>
      <Ticket />
      <Ticket />
      <Ticket />
    </ul>
  );
}

export default TicketList;
