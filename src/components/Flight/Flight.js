import React from 'react';
import { format, parseISO, add } from 'date-fns';

import styles from './Flight.module.scss';

function Flight(props) {
  const {
    segment: { destination, origin, duration, stops, date },
  } = props;

  const flightTime = `${Math.floor(duration / 60)}ч ${duration % 60}м`;
  const time = format(parseISO(date), 'HH:mm');
  const arriveTime = format(add(parseISO(date), { minutes: duration }), 'HH:mm');

  const transfers = {
    1: '1 пересадка',
    2: '2 пересадки',
    3: '3 пересадки',
  };

  return (
    <div className={styles.flight}>
      <table className={styles['flight-table']}>
        <thead>
          <tr>
            <th>
              {origin}-{destination}
            </th>
            <th>В пути</th>
            <th>{transfers[stops.length] || 'Прямой'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {time} - {arriveTime}
            </td>
            <td>{flightTime}</td>
            <td>{stops.join(', ') || null}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Flight;
