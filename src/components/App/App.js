import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Alert } from 'antd';

import { getSearchId, getTickets } from '../../services/ticketService';
import { sortTickets, filterTickets } from '../../utils/sortFunctions';
import Header from '../Header';
import Sidebar from '../Sidebar';
import TicketFilters from '../TicketFilters';
import TicketList from '../TicketList';

import styles from './App.module.scss';

function App() {
  const dispatch = useDispatch();

  const searchId = useSelector((state) => state.tickets.searchId);
  const stop = useSelector((state) => state.tickets.stop);
  const loading = useSelector((state) => state.tickets.loading);
  const error = useSelector((state) => state.tickets.error);
  const ticketsList = useSelector((state) => state.tickets.ticketsList);
  const sort = useSelector((state) => state.tickets.sort);
  const currentFilters = useSelector((state) => state.tickets.currentFilters);

  const sortTicketsList = sortTickets(filterTickets([...ticketsList], currentFilters), sort);

  const [count, setCount] = useState(5);

  useEffect(() => {
    dispatch(getSearchId());
  }, []);

  useEffect(() => {
    if (searchId && !stop) {
      dispatch(getTickets(searchId));
    }
  }, [dispatch, searchId, ticketsList, stop]);

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

  const spin = loading ? <Spin className={styles.spin} indicator={antIcon} /> : null;
  const errorMessage = error ? <Alert message="Ошибка! Попробуйте перезагрузить страницу" type="error" /> : null;
  const infoMessage =
    !loading && sortTicketsList.length === 0 ? (
      <Alert className={styles.message} message="Рейсов, подходящих под заданные фильтры, не найдено" type="info" />
    ) : null;
  const showButton =
    !error && sortTicketsList.length > 0 ? (
      <button onClick={() => setCount(count + 5)} className={styles['show-button']} type="button">
        Показать еще 5 билетов!
      </button>
    ) : null;

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Header />
        <div className={styles.main}>
          <Sidebar />
          <div className={styles.tickets}>
            <TicketFilters />
            {spin}
            <TicketList ticketsList={sortTicketsList} count={count} />
            {infoMessage}
            {errorMessage}
            {showButton}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
