import React from 'react';

import Flight from '../Flight';

import styles from './Ticket.module.scss';

function Ticket(props) {
  const {
    ticketInfo: { carrier, price, segments },
  } = props;

  const ticketPrice = `${String(price).slice(0, -3)} ${String(price).substring(-3, 3)}`;

  return (
    <div className={styles.ticket}>
      <span className={styles.price}>{ticketPrice} P</span>
      <img
        className={styles['airline-logo']}
        src={`http://pics.avs.io/220/72/${carrier}.png`}
        alt="Логотип авиакомпании"
      />
      <Flight segment={segments[0]} />
      <Flight segment={segments[1]} />
    </div>
  );
}

export default Ticket;
