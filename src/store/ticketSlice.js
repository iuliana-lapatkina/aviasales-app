import { createSlice } from '@reduxjs/toolkit';

const ticketSlice = createSlice({
  name: 'tickets',
  initialState: {
    filters: {
      all: 'Все',
      'no-transfer': 'Без пересадок',
      'one-transfer': '1 пересадка',
      'two-transfers': '2 пересадки',
      'three-transfers': '3 пересадки',
    },
    currentFilters: [],
    sort: 'low-cost',
  },

  reducers: {
    filterToTransfers(state, action) {
      const filter = action.payload.item;
      if (filter === 'all' && !state.currentFilters.includes(filter)) {
        state.currentFilters = Object.keys(state.filters);
        return;
      }
      if (filter === 'all' && state.currentFilters.includes(filter)) {
        state.currentFilters = [];
        return;
      }
      if (
        filter !== 'all' &&
        !state.currentFilters.includes(filter) &&
        !state.currentFilters.includes('all') &&
        state.currentFilters.length === 3
      ) {
        state.currentFilters.push(filter);
        state.currentFilters.push('all');
        return;
      }
      if (filter !== 'all' && state.currentFilters.includes(filter) && state.currentFilters.includes('all')) {
        const index = state.currentFilters.findIndex((el) => el === filter);
        state.currentFilters.splice(index, 1);
        const indexAll = state.currentFilters.findIndex((el) => el === 'all');
        state.currentFilters.splice(indexAll, 1);
        return;
      }
      if (state.currentFilters.includes(filter)) {
        const index = state.currentFilters.findIndex((el) => el === filter);
        state.currentFilters.splice(index, 1);
      } else {
        state.currentFilters.push(filter);
      }
    },

    sortTickets(state, action) {
      state.sort = action.payload.id;
    },
  },

  devTools: true,
});

export const { filterToTransfers, sortTickets } = ticketSlice.actions;

export default ticketSlice.reducer;
