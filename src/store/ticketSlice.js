import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getSearchId = createAsyncThunk('tickets/getSearchId', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch('https://aviasales-test-api.kata.academy/search');

    if (!res.ok) {
      throw new Error(`Could not fetch search id, ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getTickets = createAsyncThunk('tickets/fetchTickets', async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${id}`);

    if (!res.ok) {
      throw new Error(`${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

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
    status: null,
    error: true,
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
        console.log(state.ticketsList);
        console.log(state.stop);
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

    sortTickets(state, action) {
      state.sort = action.payload.id;
    },

    setSearchId(state, action) {
      state.searchId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getSearchId.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getSearchId.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.searchId = action.payload.searchId;
      })
      .addCase(getSearchId.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getTickets.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.ticketsList = action.payload.tickets;
        state.stop = action.payload.stop;
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
