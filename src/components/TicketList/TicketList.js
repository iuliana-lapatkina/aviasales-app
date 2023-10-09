import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Ticket from '../Ticket';

import styles from './TicketList.module.scss';

function TicketList(props) {
  const { count } = props;
  const ticketsList = useSelector((state) => state.tickets.ticketsList);

  const elements = ticketsList.slice(0, count).map((item) => {
    return <Ticket key={uuidv4()} ticketInfo={item} />;
  });

  return <ul className={styles['task-list']}>{elements}</ul>;
}

export default TicketList;
