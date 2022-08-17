import { Settings } from '../../utils/types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from '../index'
import axios from 'axios'
import { defaultSettings } from '../../utils/constants'

const initialState = defaultSettings

export const createSettings = createAsyncThunk('settings/createSettings', async (payload: Partial<Settings>, thunkAPI) => {
	try {
		const settings = (await axios.post(`/api/settings/${payload.id}`, payload)).data;
		thunkAPI.dispatch(setSettings(settings));
		return settings;
	} catch (err) {
		console.error(err?.response?.data)
		return thunkAPI.rejectWithValue(err?.response?.data);
	}
})

export const updateSettings = createAsyncThunk('settings/updateSettings', async (payload: Partial<Settings>, thunkAPI) => {
	try {
		const settings = (await axios.put(`/api/settings/${payload.id}`, payload)).data;
		thunkAPI.dispatch(editSettings(settings));
		return settings;
	} catch (err) {
		console.error(err?.response?.data)
		return thunkAPI.rejectWithValue(err?.response?.data);
	}
})

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setSettings: (state, action: PayloadAction<Settings>) => {
			return action.payload;
		},
		editSettings: (state, action: PayloadAction<Settings>) => {
			return {
				...state,
				...action.payload
			}
		}
	}
})

export const useSettings = (state: AppState) : Settings => state['settings']

export const { setSettings, editSettings } = settingsSlice.actions;

export default settingsSlice.reducer;