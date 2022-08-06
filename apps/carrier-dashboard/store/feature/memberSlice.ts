import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SAMPLE_TEAM } from '../../utils/constants';
import { Team, TeamRole } from '../../utils/types'
import axios from 'axios';

const initialState = SAMPLE_TEAM;

export const createMember = createAsyncThunk('member/createMember', async (payload: Partial<Team>, thunkAPI) => {
	try {
		const member = (await axios.post(`/api/member/${payload.memberId}`, payload)).data;
		thunkAPI.dispatch(addMember(member));
		return member;
	} catch (err) {
		thunkAPI.rejectWithValue(err.message);
	}
});

export const memberSlice = createSlice({
	name: 'members',
	initialState,
	reducers: {
		addMember: (state, action: PayloadAction<Team>) => {
			return [...state, action.payload];
		},
		editMember: (state, action: PayloadAction<{ id: string; data: Team }>) => {
			return state.map(member => (member.memberId === action.payload.id ? action.payload.data : member));
		},
		changeRole: (state, action: PayloadAction<{id: string, role: TeamRole}>) => {
			return state.map(member => {
				let clone = {...member}
				if (member.memberId === action.payload.id) {
					clone.role = action.payload.role;
				}
				return clone;
			});
		},
		removeMember: (state, action: PayloadAction<string>) => {
			return state.filter((member) => member.memberId !== action.payload)
		}
	}
});

// export const useMembers = state => state['members']

export const useMembers = state => {
	let team: Team[] = state['members'];
	return [...team].sort((a, b) => b.createdAt - a.createdAt);
};

export const { addMember, editMember, changeRole, removeMember } = memberSlice.actions;

export default memberSlice.reducer;
