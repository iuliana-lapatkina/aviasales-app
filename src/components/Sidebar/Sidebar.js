import React from 'react';

import styles from './Sidebar.module.scss';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>Количество пересадок</h2>
      <fieldset className={styles.fieldset}>
        <div className={styles.checkbox}>
          <label htmlFor="all">
            <input type="checkbox" id="all" name="transfer" value="All" />
            <span />
            Все
          </label>
        </div>

        <div className={styles.checkbox}>
          <label htmlFor="no-transfer">
            <input type="checkbox" id="no-transfer" name="transfer" value="no-transfer" />
            <span />
            Без пересадок
          </label>
        </div>

        <div className={styles.checkbox}>
          <label htmlFor="one-transfer">
            <input type="checkbox" id="one-transfer" name="transfer" value="one-transfer" />
            <span />1 пересадка
          </label>
        </div>

        <div className={`${styles.checkbox} ${styles.red}`}>
          <label htmlFor="two-transfer">
            <input type="checkbox" id="two-transfer" name="transfer" value="two-transfers" />
            <span />2 пересадки
          </label>
        </div>

        <div className={`${styles.checkbox} ${styles.blue}`}>
          <label htmlFor="three-transfers">
            <input type="checkbox" id="three-transfers" name="transfer" value="three-transfers" />
            <span />3 пересадки
          </label>
        </div>
      </fieldset>
    </div>
  );
}

export default Sidebar;
