import { createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

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
      if (res.status >= 500 && res.status < 600) {
        return {};
      }
      throw new Error(`${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});
