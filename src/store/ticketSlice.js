import { createSlice } from '@reduxjs/toolkit';

import { getSearchId, getTickets } from '../services/ticketService';

const ticketSlice = createSlice({
  name: 'tickets',
  initialState: {
    searchId: null,
    ticketsList: [],
    stop: null,
    filters: {
      all: 'Все',
      'no-transfer': 'Без пересадок',
      'one-transfer': '1 пересадка',
      'two-transfers': '2 пересадки',
      'three-transfers': '3 пересадки',
    },
    currentFilters: [],
    sort: 'low-cost',
    error: false,
    loading: false,
  },

  reducers: {
    filterToTransfers(state, { payload }) {
      const filterList = state.currentFilters;
      const filter = payload.item;

      const pushFilter = (el) => {
        filterList.push(el);
      };

      const removeFilter = (idx) => {
        filterList.splice(idx, 1);
      };

      const findIndex = (item) => {
        return filterList.findIndex((el) => el === item);
      };

      if (filter === 'all' && !filterList.includes(filter)) {
        state.currentFilters = Object.keys(state.filters);
        return;
      }
      if (filter === 'all' && filterList.includes(filter)) {
        state.currentFilters = [];
        return;
      }
      if (filter !== 'all' && !filterList.includes(filter) && !filterList.includes('all') && filterList.length === 3) {
        pushFilter(filter);
        pushFilter('all');
        return;
      }
      if (filter !== 'all' && filterList.includes(filter) && filterList.includes('all')) {
        removeFilter(findIndex(filter));
        removeFilter(findIndex('all'));
        return;
      }
      if (state.currentFilters.includes(filter)) {
        removeFilter(findIndex(filter));
      } else {
        pushFilter(filter);
      }
    },

    sortTickets(state, { payload }) {
      state.sort = payload.id;
    },

    setSearchId(state, { payload }) {
      state.searchId = payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getSearchId.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getSearchId.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = false;
        state.searchId = payload.searchId;
      })
      .addCase(getSearchId.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getTickets.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getTickets.fulfilled, (state, { payload }) => {
        state.loading = true;
        state.error = false;
        const newData = payload.tickets;
        if (newData) {
          state.ticketsList = state.ticketsList.concat(newData);
        }
        state.stop = payload.stop;
        if (state.searchId && !payload.stop) {
          getTickets(state.searchId);
        }
        if (payload.stop) {
          state.loading = false;
          state.error = false;
        }
      })
      .addCase(getTickets.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },

  devTools: true,
});

export const { filterToTransfers, sortTickets } = ticketSlice.actions;

export default ticketSlice.reducer;
