import React from 'react';

import styles from './TicketFilters.module.scss';

function TicketFilters() {
  const listButtons = ['Самый дешевый', 'Самый быстрый', 'Оптимальный'].map((filter) => {
    return (
      <li key={filter} className={styles.filterItem}>
        <button
          className={styles.filter}
          // className={filter === currentFilter ? 'selected' : null}
          type="button"
          // onClick={() => onFiltered(filter)}
        >
          {filter}
        </button>
      </li>
    );
  });

  return <ul className={styles.filters}>{listButtons}</ul>;
}

export default TicketFilters;
