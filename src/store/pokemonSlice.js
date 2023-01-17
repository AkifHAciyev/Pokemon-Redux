import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPokemons = createAsyncThunk('pokemons/getPokemons', async () => {
	const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=50`);
	return res.data;
});

export const pokemonsSLice = createSlice({
	name: 'pokemons',
	initialState: {
		allPokemons: [],
		status: null,
		error: null,
		page: 0,
		currentPage: 0,
	},
	reducers: {
		setPokemons: (state, action) => {
			state.allPokemons = action.payload;
		},
	},
	extraReducers: {
		[getPokemons.pending]: (state) => {
			state.status = 'pending';
		},
		[getPokemons.fulfilled]: (state, action) => {
			state.allPokemons = [...action.payload.results];
			state.pages = action.payload.count;
			state.status = 'fulfilled';
		},
		[getPokemons.rejected]: (state, action) => {
			state.status = 'rejected';
			state.error = action.error.message;
		},
	},
});

export const { setPokemons } = pokemonsSLice.actions;

export default pokemonsSLice.reducer;
