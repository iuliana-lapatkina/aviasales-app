import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSearchId, getTickets } from '../../store/ticketSlice';
import Header from '../Header';
import Sidebar from '../Sidebar';
import TicketFilters from '../TicketFilters';
import TicketList from '../TicketList';

import styles from './App.module.scss';

function App() {
  const dispatch = useDispatch();

  const searchId = useSelector((state) => state.tickets.searchId);
  const stop = useSelector((state) => state.tickets.stop);
  const ticketsList = useSelector((state) => state.tickets.ticketsList);

  const [count, setCount] = useState(5);

  useEffect(() => {
    if (!searchId) {
      dispatch(getSearchId());
    }
  }, [dispatch, searchId]);

  useEffect(() => {
    if (searchId) {
      // while (stop === false) {
      dispatch(getTickets(searchId));
      // }
    }
  }, [dispatch, searchId]);
  console.log(ticketsList);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Header />
        <div className={styles.main}>
          <Sidebar />
          <div className={styles.tickets}>
            <TicketFilters />
            <TicketList count={count} />
            <button onClick={() => setCount(count + 5)} className={styles['show-button']} type="button">
              Показать еще 5 билетов!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
