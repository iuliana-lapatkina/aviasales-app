import React from 'react';

import Header from '../Header';
import Sidebar from '../Sidebar';
import TicketFilters from '../TicketFilters';
import TicketList from '../TicketList';

import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Header />
        <div className={styles.main}>
          <Sidebar />
          <div className="tickets">
            <TicketFilters />
            <TicketList />
            <button className={styles['show-button']} type="button">
              Показать еще 5 билетов!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
