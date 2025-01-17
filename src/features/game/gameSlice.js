import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { saveGameResult, fetchGameResults } from './gameAPI';

export const fetchResults = createAsyncThunk('game/fetchResults', async () => {
  const results = await fetchGameResults();
  return results;
});

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    results: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addResult: (state, action) => {
      state.results.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResults.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.results = action.payload;
      })
      .addCase(fetchResults.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addResult } = gameSlice.actions;
export default gameSlice.reducer;
